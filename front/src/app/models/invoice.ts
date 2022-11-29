import { Client } from './client';
import { InvoiceItems } from './invoice-items';
export class Invoice {
  id: number;
  description: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  grandTotal: number;
  client: Client;
  items: InvoiceItems[];
}