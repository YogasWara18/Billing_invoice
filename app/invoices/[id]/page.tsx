'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useInvoice, useMarkInvoiceAsPaid } from '@/lib/hooks/use-invoices';
import { AppLayout } from '../../app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Download, Mail, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import { formatDate } from 'date-fns';
import { toast } from 'sonner';

export default function InvoiceDetailPage() {
  const params = useParams();
  const invoiceId = params.id as string;
  const { data: invoice, isLoading } = useInvoice(invoiceId);
  const markAsPaidMutation = useMarkInvoiceAsPaid();
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkAsPaid = async () => {
    if (!invoice) return;
    
    setIsMarking(true);
    try {
      await markAsPaidMutation.mutateAsync(invoice.id);
      toast.success('Invoice marked as paid!');
      setIsMarking(false);
    } catch (error) {
      toast.error('Failed to mark invoice as paid');
      setIsMarking(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-10 w-32" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Skeleton className="h-96 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!invoice) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Invoice not found</p>
          <Link href="/invoices">
            <Button>Back to Invoices</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  const subtotal = invoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Link href="/invoices">
            <Button variant="ghost" size="sm" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Back to Invoices
            </Button>
          </Link>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden md:inline">Download PDF</span>
              <span className="md:hidden">PDF</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto text-sm">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">Send Email</span>
              <span className="md:hidden">Email</span>
            </Button>
            {invoice.status !== 'paid' && (
              <Button
                size="sm"
                className="gap-2 w-full sm:w-auto text-sm"
                onClick={handleMarkAsPaid}
                disabled={isMarking}
              >
                <CheckCircle2 className="h-4 w-4" />
                {isMarking ? 'Processing...' : 'Mark as Paid'}
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Info */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <CardTitle className="text-2xl">{invoice.invoiceNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{invoice.description}</p>
                  </div>
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : invoice.status === 'pending'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Issue Date</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {formatDate(invoice.issueDate, 'dd MMM yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Due Date</p>
                    <p className="text-base sm:text-lg font-semibold">
                      {formatDate(invoice.dueDate, 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>

                {/* Client Info */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4">Bill To</p>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{invoice.clientName}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground break-all">{invoice.clientEmail}</p>
                  </div>
                </div>

                {/* Line Items */}
                <div className="pt-4 border-t border-border">
                  <p className="text-xs sm:text-sm font-semibold mb-4">Line Items</p>
                  <div className="space-y-3">
                    {invoice.lineItems.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{item.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.quantity} × {formatCurrency(item.rate)}
                          </p>
                        </div>
                        <p className="font-semibold whitespace-nowrap">{formatCurrency(item.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-border space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>{formatCurrency(subtotal)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-muted-foreground">Tax (10%)</p>
                    <p>{formatCurrency(tax)}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <p className="font-semibold">Total</p>
                    <p className="text-lg sm:text-xl font-bold">{formatCurrency(total)}</p>
                  </div>
                </div>

                {/* Notes */}
                {invoice.notes && (
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2">Notes</p>
                    <p className="text-xs sm:text-sm">{invoice.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm">Invoice Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Invoice ID</p>
                  <p className="font-mono text-xs sm:text-sm font-semibold break-all">{invoice.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Invoice Number</p>
                  <p className="font-semibold text-xs sm:text-sm">{invoice.invoiceNumber}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                  <p className="text-xl sm:text-2xl font-bold">{formatCurrency(invoice.amount)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === 'paid'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : invoice.status === 'pending'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : invoice.status === 'overdue'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xs sm:text-sm">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">Dibuat</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice.issueDate, 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">Jatuh Tempo</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(invoice.dueDate, 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>
                {invoice.status === 'paid' && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold">Dibayar</p>
                      <p className="text-xs text-muted-foreground">Hari ini</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
