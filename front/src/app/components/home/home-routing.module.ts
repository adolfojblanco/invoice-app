import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../../guards/auth.guard';
import { SharedComponent } from '../shared/shared.component';

const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'clients',
        loadChildren: () => import('../clients/clients.module').then((m) => m.ClientsModule),
      },
      {
        path: 'invoice',
        canActivate: [AuthGuard],
        loadChildren: () => import('../invoices/invoices.module').then((i) => i.InvoicesModule),
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
