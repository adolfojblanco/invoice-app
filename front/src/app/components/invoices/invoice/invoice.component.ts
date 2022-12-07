import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Invoice } from '../../../models/invoice';
import { InvoiceItem } from '../../../models/invoice-item';
import { InvoicesService } from '../../../services/invoices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
    `
      .example-form {
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class InvoiceComponent implements OnInit {
  termino: string = '';
  products: any[] = [];
  selectedProduct: Product;
  invoice: Invoice;
  newItem: InvoiceItem;
  client: Client;

  constructor(
    private productService: ProductsService,
    private clientService: ClientsService,
    private invoiceService: InvoicesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.clientService.getClient(id)))
      .subscribe((client) => {
        this.client = client;
      });
    this.invoice = new Invoice();
    this.invoice.grandTotal = 0;
  }

  search() {
    if (this.termino.length > 3) {
      this.productService.searchProduct(this.termino).subscribe((res) => {
        this.products = res;
      });
    }
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    const product: Product = event.option.value;
    this.termino = product.name;

    this.productService.findById(product.id).subscribe((res: any) => {
      if (this.itemExist(product.id)) {
        this.itemIncrement(product.id);
      } else {
        this.newItem = new InvoiceItem();
        this.newItem.product = res.product;
        this.newItem.quantity = 1;
        this.newItem.total = 1 * this.newItem.product.price;
        this.invoice.items.push(this.newItem);
      }
      this.grandTotal();
      this.termino = '';
    });
  }

  updateQuantity(id: number, event: any) {
    const quantity: number = event.target.value as number;
    this.invoice.items = this.invoice.items.map((item: InvoiceItem) => {
      if (id === item.product.id) {
        item.quantity = quantity;
        item.total = item.product.price * item.quantity;
      }
      this.grandTotal();
      return item;
    });
  }

  itemExist(id: number): boolean {
    let exist = false;
    this.invoice.items.forEach((item: InvoiceItem) => {
      if (id === item.product.id) {
        exist = true;
      }
    });
    return exist;
  }

  itemIncrement(id: number): void {
    this.invoice.items = this.invoice.items.map((item: InvoiceItem) => {
      if (id === item.product.id) {
        ++item.quantity;
        item.total = item.product.price * item.quantity;
      }
      return item;
    });
  }

  grandTotal() {
    let total = 0;
    this.invoice.items.map((item: InvoiceItem) => {
      total += item.total;
    });
    this.invoice.grandTotal = total;
  }

  saveInvoice() {
    this.invoiceService.createInvoice(this.invoice, this.client.id).subscribe((res) => {
      Swal.fire('Nueva Factura', `Factura de ${this.client.name}, creada correctamente`, 'success');
      this.router.navigate(['/home/clients']);
    });
  }
}
