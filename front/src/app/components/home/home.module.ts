import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material/material.module';
import { SharedComponent } from '../shared/shared.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { InvoicesComponent } from '../invoices/invoices.component';

@NgModule({
  declarations: [HomeComponent, SharedComponent, InvoicesComponent],
  imports: [CommonModule, HomeRoutingModule, MaterialModule, HttpClientModule],
})
export class HomeModule {}
