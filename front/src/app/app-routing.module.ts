import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then((a) => a.AuthModule),
  },
  {
    path: 'invoice',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/invoices/invoices.module').then((i) => i.InvoicesModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./components/products/products.module').then((p) => p.ProductsModule),
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
