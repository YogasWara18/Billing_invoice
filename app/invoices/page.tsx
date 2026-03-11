'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { useInvoices } from '@/lib/hooks/use-invoices';
import { AppLayout } from '../app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils/format';
import { formatDate } from 'date-fns';
import type { Invoice } from '@/lib/mock-data';

type SortField = 'date' | 'amount' | 'client' | 'status';
type SortOrder = 'asc' | 'desc';

export default function InvoicesPage() {
  const { data: invoices, isLoading } = useInvoices();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter and search
  const filteredInvoices = useMemo(() => {
    if (!invoices) return [];

    return invoices.filter((invoice) => {
      const matchesSearch =
        invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, statusFilter]);

  // Sort
  const sortedInvoices = useMemo(() => {
    const sorted = [...filteredInvoices].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortField) {
        case 'date':
          aValue = a.issueDate;
          bValue = b.issueDate;
          break;
        case 'amount':
          aValue = a.amount;
          bValue = b.amount;
          break;
        case 'client':
          aValue = a.clientName;
          bValue = b.clientName;
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredInvoices, sortField, sortOrder]);

  // Pagination
  const paginatedInvoices = sortedInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Faktur</h1>
            <p className="text-muted-foreground mt-1">Kelola semua faktur Anda di satu tempat</p>
          </div>
          <Link href="/invoices/create">
            <Button>Buat Faktur</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Cari</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Cari berdasarkan klien, nomor faktur, atau email..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={statusFilter} onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          Menampilkan {paginatedInvoices.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} hingga{' '}
          {Math.min(currentPage * itemsPerPage, sortedInvoices.length)} dari {sortedInvoices.length}{' '}
          faktur
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="space-y-4 p-6">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : paginatedInvoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-muted" 
                          onClick={() => handleSort('client')}>
                        <div className="flex items-center gap-2">
                          Klien {sortField === 'client' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-muted"
                          onClick={() => handleSort('date')}>
                        <div className="flex items-center gap-2">
                          Tanggal {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-muted"
                          onClick={() => handleSort('amount')}>
                        <div className="flex items-center gap-2">
                          Jumlah {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold cursor-pointer hover:bg-muted"
                          onClick={() => handleSort('status')}>
                        <div className="flex items-center gap-2">
                          Status {sortField === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </div>
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-border hover:bg-muted/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{invoice.clientName}</p>
                            <p className="text-xs text-muted-foreground">{invoice.invoiceNumber}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {formatDate(invoice.issueDate, 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {formatCurrency(invoice.amount)}
                        </td>
                        <td className="px-6 py-4">
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
                            {invoice.status === 'paid' ? 'Dibayar' : invoice.status === 'pending' ? 'Tertunda' : invoice.status === 'overdue' ? 'Jatuh Tempo' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/invoices/${invoice.id}`}>
                            <Button variant="ghost" size="sm">
                              Lihat
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Tidak ada faktur yang sesuai dengan filter Anda</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </Button>
            <div className="text-sm text-muted-foreground">
              Halaman {currentPage} dari {totalPages}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Berikutnya
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
