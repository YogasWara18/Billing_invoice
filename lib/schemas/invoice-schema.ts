import { z } from 'zod';

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Description is required'),
  quantity: z.number().min(0.1, 'Quantity must be greater than 0'),
  rate: z.number().min(0.01, 'Rate must be greater than 0'),
  amount: z.number(),
});

export const invoiceFormSchema = z.object({
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email address'),
  issueDate: z.date({ errorMap: () => ({ message: 'Issue date is required' }) }),
  dueDate: z.date({ errorMap: () => ({ message: 'Due date is required' }) }),
  description: z.string().optional(),
  notes: z.string().optional(),
  lineItems: z.array(lineItemSchema).min(1, 'At least one line item is required'),
});

export type InvoiceFormData = z.infer<typeof invoiceFormSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
