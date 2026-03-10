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
      const newInvoice: Invoice = {
        id: Date.now().toString(),
        status: 'pending',
        amount: total,
        ...data,
      };

      await createInvoiceMutation.mutateAsync(newInvoice);
      toast.success('Faktur berhasil dibuat!');
      reset();
      router.push('/invoices');
    } catch (error) {
      toast.error('Gagal membuat faktur');
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
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Buat Faktur</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Buat faktur baru untuk klien Anda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invoice Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Detail Faktur</CardTitle>
                  <CardDescription>Informasi dasar tentang faktur</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SimpleInput
                      label="Nomor Faktur"
                      placeholder="INV-001"
                      disabled
                      {...register('invoiceNumber')}
                      error={errors.invoiceNumber?.message}
                    />
                    <SimpleInput
                      label="Deskripsi"
                      placeholder="Mis: Layanan Pengembangan Web"
                      {...register('description')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SimpleInput
                      label="Tanggal Penerbitan"
                      type="date"
                      {...register('issueDate', { setValueAs: (value) => new Date(value) })}
                      error={errors.issueDate?.message}
                    />
                    <SimpleInput
                      label="Tanggal Jatuh Tempo"
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
                  <CardTitle>Informasi Klien</CardTitle>
                  <CardDescription>Untuk siapa faktur ini?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SimpleInput
                    label="Nama Klien"
                    placeholder="Nama Klien atau Perusahaan"
                    {...register('clientName')}
                    error={errors.clientName?.message}
                  />
                  <SimpleInput
                    label="Alamat Email"
                    type="email"
                    placeholder="klien@contoh.com"
                    {...register('clientEmail')}
                    error={errors.clientEmail?.message}
                  />
                </CardContent>
              </Card>

              {/* Line Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Item Barang</CardTitle>
                  <CardDescription>Apa yang Anda tarik untuk?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-2 font-semibold">Deskripsi</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Qty</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Tarif</th>
                          <th className="text-right py-2 px-2 font-semibold w-20 sm:w-24">Jumlah</th>
                          <th className="text-center py-2 px-2 font-semibold w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {fields.map((field, index) => (
                          <tr key={field.id} className="border-b border-border">
                            <td className="py-3 px-2">
                              <Input
                                {...register(`lineItems.${index}.description`)}
                                placeholder="Mis: Desain Web"
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
                    <span className="hidden sm:inline">Tambah Item Barang</span>
                    <span className="sm:hidden">Tambah</span>
                  </Button>

                  {errors.lineItems && (
                    <p className="text-xs text-red-500">{errors.lineItems.message}</p>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Catatan Tambahan</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    {...register('notes')}
                    placeholder="Terima kasih atas bisnis Anda! Syarat pembayaran, dll."
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
                  <CardTitle className="text-xs sm:text-base">Ringkasan Faktur</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-right">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pajak (10%)</span>
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
                        Batal
                      </Button>
                    </Link>
                    <Button
                      type="submit"
                      className="flex-1 text-xs sm:text-sm"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Membuat...' : 'Buat Faktur'}
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
