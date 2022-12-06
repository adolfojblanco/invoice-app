import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { MaterialModule } from '../material/material.module';
import { SharedComponent } from '../shared/shared.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoiceDetailsComponent, InvoiceComponent],
  imports: [CommonModule, InvoicesRoutingModule, MaterialModule, FormsModule],
})
export class InvoicesModule {}
