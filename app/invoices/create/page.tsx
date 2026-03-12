'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceFormSchema, type InvoiceFormData } from '@/lib/schemas/invoice-schema';
import { useCreateInvoice } from '@/lib/hooks/use-invoices';
import { AppLayout } from '../../app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils/format';
import { SimpleInput } from '@/components/form-field';
import type { Invoice } from '@/lib/mock-data';

const DEFAULT_INVOICE_NUMBER = () => `INV-${Date.now().toString().slice(-6)}`;
const DEFAULT_DUE_DATE = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
const EMPTY_LINE_ITEM = () => ({ id: Date.now().toString(), description: '', quantity: 1, rate: 0, amount: 0 });
const TAX_RATE = 0.1;

export default function CreateInvoicePage() {
  const router = useRouter();
  const createInvoiceMutation = useCreateInvoice();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, register, handleSubmit, watch, setValue, formState: { errors }, reset } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      invoiceNumber: DEFAULT_INVOICE_NUMBER(),
      clientName: '',
      clientEmail: '',
      issueDate: new Date(),
      dueDate: DEFAULT_DUE_DATE(),
      description: '',
      notes: '',
      lineItems: [EMPTY_LINE_ITEM()],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'lineItems' });
  const lineItems = watch('lineItems');

  const subtotal = lineItems.reduce((sum, item) => sum + (item?.amount || 0), 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handleLineItemAmountChange = (index: number) => {
    const quantity = lineItems[index]?.quantity || 0;
    const rate = lineItems[index]?.rate || 0;
    setValue(`lineItems.${index}.amount`, quantity * rate);
  };

  const onSubmit = async (data: InvoiceFormData) => {
    setIsSubmitting(true);
    try {
      // Ensure all line item amounts are calculated correctly
      const calculatedLineItems = data.lineItems.map((item) => ({
        ...item,
        amount: item.quantity * item.rate,
      }));

      const subtotalAmount = calculatedLineItems.reduce((sum, item) => sum + item.amount, 0);
      const taxAmount = subtotalAmount * TAX_RATE;
      const totalAmount = subtotalAmount + taxAmount;

      const newInvoice: Invoice = {
        id: Date.now().toString(),
        status: 'pending',
        amount: totalAmount,
        ...data,
        lineItems: calculatedLineItems,
      };

      await createInvoiceMutation.mutateAsync(newInvoice);
      toast.success('Invoice created successfully!');
      reset();
      router.push('/invoices');
    } catch (error) {
      toast.error('Failed to create invoice');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Link href="/invoices">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Create Invoice</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Create a new invoice for your client</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invoice Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Invoice Details</CardTitle>
                  <CardDescription>Basic invoice information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SimpleInput
                      label="Invoice Number"
                      placeholder="INV-001"
                      disabled
                      {...register('invoiceNumber')}
                      error={errors.invoiceNumber?.message}
                    />
                    <SimpleInput
                      label="Description"
                      placeholder="E.g: Web Development Service"
                      {...register('description')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SimpleInput
                      label="Issue Date"
                      type="date"
                      {...register('issueDate', { setValueAs: (value) => new Date(value) })}
                      error={errors.issueDate?.message}
                    />
                    <SimpleInput
                      label="Due Date"
                      type="date"
                      {...register('dueDate', { setValueAs: (value) => new Date(value) })}
                      error={errors.dueDate?.message}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Client Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                  <CardDescription>Who is this invoice for?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SimpleInput
                    label="Client Name"
                    placeholder="Client Name or Company"
                    {...register('clientName')}
                    error={errors.clientName?.message}
                  />
                  <SimpleInput
                    label="Email Address"
                    type="email"
                    placeholder="client@example.com"
                    {...register('clientEmail')}
                    error={errors.clientEmail?.message}
                  />
                </CardContent>
              </Card>

              {/* Line Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Line Items</CardTitle>
                  <CardDescription>What are you charging for?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 font-semibold">Description</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Qty</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Rate</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Amount</th>
                          <th className="text-center py-2 px-2 font-semibold w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {fields.map((field, index) => (
                          <tr key={field.id} className="border-b border-border">
                            <td className="py-3 px-2">
                              <Input
                                {...register(`lineItems.${index}.description`)}
                                placeholder="E.g: Web Design"
                                className="text-xs sm:text-sm"
                              />
                              {errors.lineItems?.[index]?.description && (
                                <p className="text-xs text-red-500 mt-1">{errors.lineItems[index]?.description?.message}</p>
                              )}
                            </td>
                            <td className="py-3 px-2">
                              <Input
                                type="number"
                                step="0.1"
                                {...register(`lineItems.${index}.quantity`, { setValueAs: (v) => parseFloat(v) || 0 })}
                                onChange={() => handleLineItemAmountChange(index)}
                                placeholder="0"
                                className="text-xs sm:text-sm text-right"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <Input
                                type="number"
                                step="0.01"
                                {...register(`lineItems.${index}.rate`, { setValueAs: (v) => parseFloat(v) || 0 })}
                                onChange={() => handleLineItemAmountChange(index)}
                                placeholder="0.00"
                                className="text-xs sm:text-sm text-right"
                              />
                            </td>
                            <td className="py-3 px-2">
                              <div className="text-xs sm:text-sm text-right font-semibold p-2 bg-muted rounded">
                                {formatCurrency(lineItems[index]?.amount || 0)}
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              {fields.length > 1 && (
                                <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append(EMPTY_LINE_ITEM())}
                    className="gap-2 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add Line Item</span>
                    <span className="sm:hidden">Add</span>
                  </Button>

                  {errors.lineItems && (
                    <p className="text-xs text-red-500">{errors.lineItems.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    {...register('notes')}
                    placeholder="Thank you for your business! Payment terms, etc."
                    className="w-full p-3 border border-input rounded-md text-xs sm:text-sm"
                    rows={4}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Summary Sidebar */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle className="text-xs sm:text-base">Invoice Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-right">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="text-right">{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-lg font-bold pt-2 border-t border-border">
                      <span>Total</span>
                      <span className="text-right">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Link href="/invoices" className="flex-1">
                      <Button variant="outline" className="w-full text-xs sm:text-sm">
                        Cancel
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="flex-1 text-xs sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating...' : 'Create Invoice'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
