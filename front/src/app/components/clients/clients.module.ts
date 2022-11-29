import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ClientComponent } from './client/client.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent, ClientComponent, ClientDetailsComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, ClientsRoutingModule],
})
export class ClientsModule {}
