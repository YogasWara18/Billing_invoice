import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Plus } from 'lucide-react';

export function EmptyInvoiceState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Get started by creating your first invoice. Track payments and manage your business finances.
        </p>
        <Link href="/invoices/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Your First Invoice
          </Button>
        </Link>
      </div>
    </div>
  );
}
