import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ClientComponent } from './client/client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, ClientsRoutingModule],
})
export class ClientsModule {}
