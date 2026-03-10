import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getInvoices,
  getInvoiceById,
  getTotalRevenue,
  getPaidInvoices,
  getPendingInvoices,
  getOverdueInvoices,
  addInvoice,
  markInvoiceAsPaid,
  type Invoice,
} from '@/lib/mock-data';

const SIMULATED_DELAY = 100; // ms for simulating network delay
const MUTATION_DELAY = 500; // ms for simulating mutation delay

// Helper function to simulate async operations
const simulateAsync = <T,>(fn: () => T, delay: number): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(fn()), delay));

// Invoice Queries
export function useInvoices() {
  return useQuery({
    queryKey: ['invoices'],
    queryFn: () => simulateAsync(() => getInvoices(), SIMULATED_DELAY),
  });
}

export function useInvoice(id: string | null) {
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: () => simulateAsync(() => getInvoiceById(id || ''), SIMULATED_DELAY),
    enabled: !!id,
  });
}

// Revenue Query
export function useTotalRevenue() {
  return useQuery({
    queryKey: ['totalRevenue'],
    queryFn: () => simulateAsync(() => getTotalRevenue(), SIMULATED_DELAY),
  });
}

// Status Queries
export function usePaidInvoices() {
  return useQuery({
    queryKey: ['paidInvoices'],
    queryFn: () => simulateAsync(() => getPaidInvoices(), SIMULATED_DELAY),
  });
}

export function usePendingInvoices() {
  return useQuery({
    queryKey: ['pendingInvoices'],
    queryFn: () => simulateAsync(() => getPendingInvoices(), SIMULATED_DELAY),
  });
}

export function useOverdueInvoices() {
  return useQuery({
    queryKey: ['overdueInvoices'],
    queryFn: () => simulateAsync(() => getOverdueInvoices(), SIMULATED_DELAY),
  });
}

// Helper to invalidate all invoice-related queries
const invalidateInvoiceQueries = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: ['invoices'] });
  queryClient.invalidateQueries({ queryKey: ['invoice'] });
  queryClient.invalidateQueries({ queryKey: ['totalRevenue'] });
  queryClient.invalidateQueries({ queryKey: ['paidInvoices'] });
  queryClient.invalidateQueries({ queryKey: ['pendingInvoices'] });
  queryClient.invalidateQueries({ queryKey: ['overdueInvoices'] });
};

// Mutations
export function useMarkInvoiceAsPaid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoiceId: string) =>
      simulateAsync(() => markInvoiceAsPaid(invoiceId), MUTATION_DELAY),
    onSuccess: () => invalidateInvoiceQueries(queryClient),
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invoice: Invoice) =>
      simulateAsync(() => addInvoice(invoice), MUTATION_DELAY),
    onSuccess: () => invalidateInvoiceQueries(queryClient),
  });
}
