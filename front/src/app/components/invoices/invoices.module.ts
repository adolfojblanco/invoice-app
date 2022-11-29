import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { MaterialModule } from '../material/material.module';
import { SharedComponent } from '../shared/shared.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [InvoiceDetailsComponent, InvoiceComponent],
  imports: [CommonModule, InvoicesRoutingModule, MaterialModule],
})
export class InvoicesModule {}
