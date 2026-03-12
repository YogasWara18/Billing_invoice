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
  {
    id: '7',
    invoiceNumber: 'INV-007',
    clientName: 'PT Industri Manufaktur Maju',
    clientEmail: 'procurement@industri-manufaktur.com',
    amount: 94500000,
    status: 'paid',
    issueDate: new Date('2024-02-10'),
    dueDate: new Date('2024-03-10'),
    description: 'Layanan Konsultasi Manufaktur',
    lineItems: [
      {
        id: '7-1',
        description: 'Audit Proses Produksi',
        quantity: 15,
        rate: 3000000,
        amount: 45000000,
      },
      {
        id: '7-2',
        description: 'Rencana Perbaikan Efisiensi',
        quantity: 20,
        rate: 2250000,
        amount: 45000000,
      },
      {
        id: '7-3',
        description: 'Pelatihan Tim',
        quantity: 6,
        rate: 1500000,
        amount: 9000000,
      },
    ],
  },
  {
    id: '8',
    invoiceNumber: 'INV-008',
    clientName: 'Universitas Swasta Terkemuka',
    clientEmail: 'finance@universitas.ac.id',
    amount: 75000000,
    status: 'paid',
    issueDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-20'),
    description: 'Platform Pembelajaran Online',
    lineItems: [
      {
        id: '8-1',
        description: 'Pengembangan Platform LMS',
        quantity: 50,
        rate: 1200000,
        amount: 60000000,
      },
      {
        id: '8-2',
        description: 'Integrasi Sistem Akademik',
        quantity: 15,
        rate: 1000000,
        amount: 15000000,
      },
    ],
  },
  {
    id: '9',
    invoiceNumber: 'INV-009',
    clientName: 'Klinik Kesehatan Mitra Sehat',
    clientEmail: 'billing@klinik-mitra.id',
    amount: 42000000,
    status: 'pending',
    issueDate: new Date('2024-03-15'),
    dueDate: new Date('2024-04-15'),
    description: 'Sistem Manajemen Pasien',
    lineItems: [
      {
        id: '9-1',
        description: 'Pengembangan Aplikasi Mobile',
        quantity: 35,
        rate: 900000,
        amount: 31500000,
      },
      {
        id: '9-2',
        description: 'Dukungan Database',
        quantity: 10,
        rate: 1050000,
        amount: 10500000,
      },
    ],
  },
  {
    id: '10',
    invoiceNumber: 'INV-010',
    clientName: 'Agensi Perjalanan Wisata Indonesia',
    clientEmail: 'accounts@wisata-tour.co.id',
    amount: 58500000,
    status: 'pending',
    issueDate: new Date('2024-03-20'),
    dueDate: new Date('2024-04-20'),
    description: 'Website Booking Paket Wisata',
    lineItems: [
      {
        id: '10-1',
        description: 'Desain & Pengembangan Web',
        quantity: 45,
        rate: 1000000,
        amount: 45000000,
      },
      {
        id: '10-2',
        description: 'Integrasi Payment Gateway',
        quantity: 15,
        rate: 900000,
        amount: 13500000,
      },
    ],
  },
  {
    id: '11',
    invoiceNumber: 'INV-011',
    clientName: 'PT Retail Elektronik Semarang',
    clientEmail: 'accounts@retail-elektronik.com',
    amount: 135000000,
    status: 'paid',
    issueDate: new Date('2024-01-15'),
    dueDate: new Date('2024-02-15'),
    description: 'Sistem Manajemen Inventori',
    lineItems: [
      {
        id: '11-1',
        description: 'Pengembangan Aplikasi Desktop',
        quantity: 60,
        rate: 1800000,
        amount: 108000000,
      },
      {
        id: '11-2',
        description: 'Integrasi Database Terpusat',
        quantity: 20,
        rate: 1350000,
        amount: 27000000,
      },
    ],
  },
  {
    id: '12',
    invoiceNumber: 'INV-012',
    clientName: 'Firma Hukum Advokat Sejahtera',
    clientEmail: 'billing@advokat-sejahtera.co.id',
    amount: 87500000,
    status: 'paid',
    issueDate: new Date('2024-02-05'),
    dueDate: new Date('2024-03-05'),
    description: 'Platform Manajemen Kasus',
    lineItems: [
      {
        id: '12-1',
        description: 'Pengembangan Web Application',
        quantity: 50,
        rate: 1500000,
        amount: 75000000,
      },
      {
        id: '12-2',
        description: 'Keamanan & Enkripsi Data',
        quantity: 10,
        rate: 1250000,
        amount: 12500000,
      },
    ],
  },
  {
    id: '13',
    invoiceNumber: 'INV-013',
    clientName: 'Perusahaan Logistik Indonesia Maju',
    clientEmail: 'finance@logistik-maju.id',
    amount: 156000000,
    status: 'overdue',
    issueDate: new Date('2024-01-20'),
    dueDate: new Date('2024-02-20'),
    description: 'Sistem Tracking Real-time',
    lineItems: [
      {
        id: '13-1',
        description: 'Aplikasi Mobile & Web',
        quantity: 80,
        rate: 1600000,
        amount: 128000000,
      },
      {
        id: '13-2',
        description: 'Integrasi GPS & Real-time',
        quantity: 20,
        rate: 1400000,
        amount: 28000000,
      },
    ],
  },
  {
    id: '14',
    invoiceNumber: 'INV-014',
    clientName: 'Hotel Resort Bali Paradise',
    clientEmail: 'accounts@baliparadise.com',
    amount: 104500000,
    status: 'pending',
    issueDate: new Date('2024-03-10'),
    dueDate: new Date('2024-04-10'),
    description: 'Sistem Reservasi Hotel',
    lineItems: [
      {
        id: '14-1',
        description: 'Booking Engine Development',
        quantity: 55,
        rate: 1500000,
        amount: 82500000,
      },
      {
        id: '14-2',
        description: 'Customer Portal',
        quantity: 15,
        rate: 1333333,
        amount: 22000000,
      },
    ],
  },
  {
    id: '15',
    invoiceNumber: 'INV-015',
    clientName: 'Rumah Sakit Mitra Kesehatan',
    clientEmail: 'finance@rs-mitra.co.id',
    amount: 198000000,
    status: 'pending',
    issueDate: new Date('2024-02-20'),
    dueDate: new Date('2024-03-20'),
    description: 'Hospital Management System',
    lineItems: [
      {
        id: '15-1',
        description: 'EMR System Development',
        quantity: 100,
        rate: 1600000,
        amount: 160000000,
      },
      {
        id: '15-2',
        description: 'Pharmacy Integration',
        quantity: 25,
        rate: 1520000,
        amount: 38000000,
      },
    ],
  },
  {
    id: '16',
    invoiceNumber: 'INV-016',
    clientName: 'Universitas Teknologi Indonesia',
    clientEmail: 'accounts@universitas-teknologi.ac.id',
    amount: 167500000,
    status: 'pending',
    issueDate: new Date('2024-03-01'),
    dueDate: new Date('2024-04-01'),
    description: 'Campus Management System',
    lineItems: [
      {
        id: '16-1',
        description: 'Student Information System',
        quantity: 70,
        rate: 1700000,
        amount: 119000000,
      },
      {
        id: '16-2',
        description: 'Academic Module',
        quantity: 35,
        rate: 1386000,
        amount: 48500000,
      },
    ],
  },
  {
    id: '17',
    invoiceNumber: 'INV-017',
    clientName: 'Toko Fashion Online Trendy',
    clientEmail: 'business@toko-fashion.id',
    amount: 89000000,
    status: 'paid',
    issueDate: new Date('2024-01-25'),
    dueDate: new Date('2024-02-25'),
    description: 'E-commerce Platform',
    lineItems: [
      {
        id: '17-1',
        description: 'Online Store Development',
        quantity: 50,
        rate: 1400000,
        amount: 70000000,
      },
      {
        id: '17-2',
        description: 'Mobile App',
        quantity: 15,
        rate: 1266667,
        amount: 19000000,
      },
    ],
  },
  {
    id: '18',
    invoiceNumber: 'INV-018',
    clientName: 'Bank Swasta Modern Indonesia',
    clientEmail: 'procurement@bank-modern.co.id',
    amount: 245000000,
    status: 'pending',
    issueDate: new Date('2024-02-28'),
    dueDate: new Date('2024-03-28'),
    description: 'Digital Banking Platform',
    lineItems: [
      {
        id: '18-1',
        description: 'Mobile Banking App',
        quantity: 100,
        rate: 1800000,
        amount: 180000000,
      },
      {
        id: '18-2',
        description: 'Security & Compliance',
        quantity: 35,
        rate: 1857000,
        amount: 65000000,
      },
    ],
  },
  {
    id: '19',
    invoiceNumber: 'INV-019',
    clientName: 'Restoran Kuliner Nusantara',
    clientEmail: 'owner@restoran-nusantara.com',
    amount: 76500000,
    status: 'overdue',
    issueDate: new Date('2024-01-10'),
    dueDate: new Date('2024-02-10'),
    description: 'Point of Sale System',
    lineItems: [
      {
        id: '19-1',
        description: 'POS Application',
        quantity: 35,
        rate: 1500000,
        amount: 52500000,
      },
      {
        id: '19-2',
        description: 'Inventory Management',
        quantity: 20,
        rate: 1200000,
        amount: 24000000,
      },
    ],
  },
  {
    id: '20',
    invoiceNumber: 'INV-020',
    clientName: 'PT Pertanian Modern Nusantara',
    clientEmail: 'finance@pertanian-modern.co.id',
    amount: 112000000,
    status: 'paid',
    issueDate: new Date('2024-03-05'),
    dueDate: new Date('2024-04-05'),
    description: 'Agricultural Management Platform',
    lineItems: [
      {
        id: '20-1',
        description: 'Crop Management System',
        quantity: 60,
        rate: 1600000,
        amount: 96000000,
      },
      {
        id: '20-2',
        description: 'Weather Integration',
        quantity: 10,
        rate: 1600000,
        amount: 16000000,
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
