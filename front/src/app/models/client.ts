import { Invoice } from './invoice';
export class Client {
  id: number;
  name: string;
  surname1: string;
  surname2: string;
  email: string;
  image?: string;
  invoices: Invoice[] = [];
  createAt?: string;
}
