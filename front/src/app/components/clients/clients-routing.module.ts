import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ClientsComponent } from './clients.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
