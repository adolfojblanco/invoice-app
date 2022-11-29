import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styles: [],
})
export class InvoiceDetailsComponent implements OnInit {
  constructor(private invoiceService: InvoicesService) {}
  ngOnInit(): void {
    this.invoiceService.getAllInvoice().subscribe((res) => console.log(res));
  }
}
