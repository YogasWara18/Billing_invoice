export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  issueDate: Date;
  dueDate: Date;
  description?: string;
  lineItems: LineItem[];
  notes?: string;
}

export const mockInvoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    clientName: 'PT Teknologi Maju Indonesia',
    clientEmail: 'billing@techindonesia.com',
    amount: 78750000,
    status: 'paid',
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-03-31'),
    description: 'Layanan Pengembangan Web',
    lineItems: [
      {
        id: '1-1',
        description: 'Pengembangan Frontend',
        quantity: 40,
        rate: 1500000,
        amount: 60000000,
      },
      {
        id: '1-2',
        description: 'Integrasi API',
        quantity: 12.5,
        rate: 1500000,
        amount: 18750000,
      },
    ],
    notes: 'Terima kasih atas kepercayaan Anda!',
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    clientName: 'Startup Digital Jakarta',
    clientEmail: 'finance@startupdigital.co.id',
    amount: 127500000,
    status: 'pending',
    issueDate: new Date('2024-02-15'),
    dueDate: new Date('2024-03-15'),
    description: 'Layanan Konsultasi',
    lineItems: [
      {
        id: '2-1',
        description: 'Konsultasi Strategi',
        quantity: 20,
        rate: 2250000,
        amount: 45000000,
      },
      {
        id: '2-2',
        description: 'Desain Arsitektur',
        quantity: 35,
        rate: 2250000,
        amount: 78750000,
      },
      {
        id: '2-3',
        description: 'Dokumentasi',
        quantity: 5,
        rate: 750000,
        amount: 3750000,
      },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    clientName: 'Solusi Global Asia Pasifik',
    clientEmail: 'accounting@globalsolutions.id',
    amount: 187500000,
    status: 'pending',
    issueDate: new Date('2024-03-10'),
    dueDate: new Date('2024-04-10'),
    description: 'Lisensi Perangkat Lunak & Dukungan',
    lineItems: [
      {
        id: '3-1',
        description: 'Lisensi Perangkat Lunak Tahunan',
        quantity: 1,
        rate: 150000000,
        amount: 150000000,
      },
      {
        id: '3-2',
        description: 'Paket Dukungan Premium',
        quantity: 1,
        rate: 37500000,
        amount: 37500000,
      },
    ],
  },
  {
    id: '4',
    invoiceNumber: 'INV-004',
    clientName: 'Perusahaan Besar Nusantara',
    clientEmail: 'invoices@perusahaan-besar.com',
    amount: 56250000,
    status: 'paid',
    issueDate: new Date('2024-02-01'),
    dueDate: new Date('2024-03-01'),
    description: 'Pemeliharaan & Pembaruan Sistem',
    lineItems: [
      {
        id: '4-1',
        description: 'Pemeliharaan Bulanan',
        quantity: 1,
        rate: 56250000,
        amount: 56250000,
      },
    ],
  },
  {
    id: '5',
    invoiceNumber: 'INV-005',
    clientName: 'Agensi Kreatif Profesional',
    clientEmail: 'billing@agensi-kreatif.id',
    amount: 63000000,
    status: 'overdue',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    description: 'Layanan Desain Grafis',
    lineItems: [
      {
        id: '5-1',
        description: 'Desain UI/UX',
        quantity: 28,
        rate: 1875000,
        amount: 52500000,
      },
      {
        id: '5-2',
        description: 'Panduan Brand',
        quantity: 1,
        rate: 10500000,
        amount: 10500000,
      },
    ],
  },
  {
    id: '6',
    invoiceNumber: 'INV-006',
    clientName: 'Kelompok Media Digital Indonesia',
    clientEmail: 'accounts@mediadigital.co.id',
    amount: 102000000,
    status: 'pending',
    issueDate: new Date('2024-03-05'),
    dueDate: new Date('2024-04-05'),
    description: 'Layanan Pemasaran Konten',
    lineItems: [
      {
        id: '6-1',
        description: 'Penulisan Artikel Blog (12 artikel)',
        quantity: 1,
        rate: 54000000,
        amount: 54000000,
      },
      {
        id: '6-2',
        description: 'Manajemen Media Sosial',
        quantity: 1,
        rate: 48000000,
        amount: 48000000,
      },
    ],
  },
];

// Session storage for new invoices (cleared on page reload)
let createdInvoices: Invoice[] = [];

// Data Management
export const addInvoice = (invoice: Invoice): Invoice => {
  createdInvoices.push(invoice);
  return invoice;
};

export const getAllInvoices = (): Invoice[] => [...mockInvoices, ...createdInvoices];
export const getInvoices = (): Invoice[] => getAllInvoices();
export const getInvoiceById = (id: string): Invoice | undefined => 
  getAllInvoices().find((inv) => inv.id === id);

// Revenue Calculations
export const getTotalRevenue = (): number => 
  getAllInvoices().reduce((sum, inv) => sum + inv.amount, 0);

// Status Filtering
export const getPaidInvoices = (): Invoice[] => 
  getAllInvoices().filter((inv) => inv.status === 'paid');

export const getPendingInvoices = (): Invoice[] => 
  getAllInvoices().filter((inv) => inv.status === 'pending' || inv.status === 'overdue');

export const getOverdueInvoices = (): Invoice[] => 
  getAllInvoices().filter((inv) => inv.status === 'overdue');

// Status Updates
export const markInvoiceAsPaid = (invoiceId: string): Invoice | undefined => {
  const invoice = getAllInvoices().find((inv) => inv.id === invoiceId);
  if (invoice) invoice.status = 'paid';
  return invoice;
};
