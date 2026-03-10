import { z } from 'zod';

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Deskripsi diperlukan'),
  quantity: z.number().min(0.1, 'Kuantitas harus lebih besar dari 0'),
  rate: z.number().min(0.01, 'Tarif harus lebih besar dari 0'),
  amount: z.number(),
});

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, 'Nomor faktur diperlukan'),
  clientName: z.string().min(1, 'Nama klien diperlukan'),
  clientEmail: z.string().email('Alamat email tidak valid'),
  issueDate: z.date({ errorMap: () => ({ message: 'Tanggal penerbitan diperlukan' }) }),
  dueDate: z.date({ errorMap: () => ({ message: 'Tanggal jatuh tempo diperlukan' }) }),
  description: z.string().optional(),
  notes: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, 'Minimal satu item barang diperlukan'),
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
