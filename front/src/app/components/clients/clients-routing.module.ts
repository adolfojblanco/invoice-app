import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients.component';
import { ClientDetailsComponent } from './client-details/client-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClientsComponent,
      },
      {
        path: 'new',
        component: ClientComponent,
      },
      {
        path: 'edit/:id',
        component: ClientComponent,
      },
      {
        path: 'details/:id',
        component: ClientDetailsComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
