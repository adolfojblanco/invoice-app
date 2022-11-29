import { Component, OnInit } from '@angular/core';
import { InvoicesService } from 'src/app/services/invoices.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Invoice } from '../../../models/invoice';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styles: [],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice;

  constructor(private invoiceService: InvoicesService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.invoiceService.getInvoice(id)))
      .subscribe((res) => {
        this.invoice = res;
        console.log(res);
      });
  }
}
