import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from './products.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductComponent, ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class ProductsModule {}
