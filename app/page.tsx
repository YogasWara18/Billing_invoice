'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useInvoices, useTotalRevenue, usePaidInvoices, usePendingInvoices, useOverdueInvoices } from '@/lib/hooks/use-invoices';
import { AppLayout } from './app-layout';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, FileText, Clock, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/lib/utils/format';
import { formatDate } from 'date-fns';

export default function DashboardPage() {
  const { data: invoices, isLoading: invoicesLoading, refetch: refetchInvoices } = useInvoices();
  const { data: totalRevenue, isLoading: revenueLoading, refetch: refetchRevenue } = useTotalRevenue();
  const { data: paidInvoices, isLoading: paidLoading, refetch: refetchPaid } = usePaidInvoices();
  const { data: pendingInvoices, isLoading: pendingLoading, refetch: refetchPending } = usePendingInvoices();
  const { data: overdueInvoices, isLoading: overdueLoading, refetch: refetchOverdue } = useOverdueInvoices();

  // Auto-refresh dashboard data every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchInvoices();
      refetchRevenue();
      refetchPaid();
      refetchPending();
      refetchOverdue();
    }, 60000);

    return () => clearInterval(interval);
  }, [refetchInvoices, refetchRevenue, refetchPaid, refetchPending, refetchOverdue]);

  const isLoading = invoicesLoading || revenueLoading || paidLoading || pendingLoading || overdueLoading;

  // Prepare chart data for revenue by month - dynamically calculated from invoice dates
  const calculateMonthlyRevenue = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const monthData = months.map((month) => ({ month, revenue: 0 }));
    
    invoices?.forEach((invoice) => {
      const month = invoice.issueDate.getMonth();
      if (month < 6) {
        monthData[month].revenue += invoice.amount;
      }
    });
    
    return monthData;
  };
  
  const chartData = calculateMonthlyRevenue();

  // Pie chart data for invoice status
  const pieData = [
    { name: 'Paid', value: paidInvoices?.length || 0 },
    { name: 'Pending', value: (pendingInvoices?.length || 0) - (overdueInvoices?.length || 0) },
    { name: 'Overdue', value: overdueInvoices?.length || 0 },
  ];

  const COLORS = ['#22c55e', '#3b82f6', '#ef4444'];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your financial overview.</p>
          </div>
          <Link href="/invoices/create">
            <Button>Create Invoice</Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={isLoading ? <Skeleton className="h-8 w-24" /> : formatCurrency(totalRevenue || 0)}
            icon={DollarSign}
            description="All-time revenue"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Paid Invoices"
            value={isLoading ? <Skeleton className="h-8 w-24" /> : paidInvoices?.length || 0}
            icon={FileText}
            description="Successfully collected"
          />
          <StatCard
            title="Pending Invoices"
            value={isLoading ? <Skeleton className="h-8 w-24" /> : (pendingInvoices?.length || 0) - (overdueInvoices?.length || 0)}
            icon={Clock}
            description="Awaiting payment"
          />
          <StatCard
            title="Overdue Invoices"
            value={isLoading ? <Skeleton className="h-8 w-24" /> : overdueInvoices?.length || 0}
            icon={AlertCircle}
            description="Require immediate action"
            trend={{ value: -5, isPositive: false }}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-96 flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis width={80} />
                    <Tooltip
                      formatter={(value) => formatCurrency(value as number)}
                      contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--border)' }}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#3b82f6"
                      label={{
                        position: 'top',
                        formatter: (value) => formatCurrency(value as number),
                        fill: 'currentColor',
                        fontSize: 12,
                      }}
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Invoice Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <Skeleton className="h-full w-full" />
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Invoices</CardTitle>
            <Link href="/invoices">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : invoices && invoices.length > 0 ? (
              <div className="space-y-4">
                {invoices.slice(0, 5).map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold">{invoice.clientName}</p>
                      <p className="text-sm text-muted-foreground">{invoice.invoiceNumber}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(invoice.amount)}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(invoice.issueDate, 'MMM dd')}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : invoice.status === 'pending'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : invoice.status === 'overdue'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No invoices yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
