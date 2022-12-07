import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedComponent } from '../shared/shared.component';

@NgModule({
  declarations: [HomeComponent, SharedComponent],
  imports: [CommonModule, MaterialModule, HttpClientModule, HomeRoutingModule],
})
export class HomeModule {}
