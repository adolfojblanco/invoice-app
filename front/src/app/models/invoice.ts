import { Client } from './client';
import { InvoiceItem } from './invoice-item';
export class Invoice {
  id: number;
  description: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  grandTotal: number;
  client: Client;
  items: InvoiceItem[] = [];
}
