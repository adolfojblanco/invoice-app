import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { InvoicesComponent } from './invoices.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    children: [
      {
        path: 'details/:id',
        component: InvoiceDetailsComponent,
      },
      {
        path: 'new',
        component: InvoiceComponent,
      },
      {
        path: 'new',
        component: InvoiceDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
