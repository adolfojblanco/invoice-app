import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductsService } from '../../../services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  product: Product;
  formName: string;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.formName = 'Registro de producto';
  }

  /** Product form */
  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: ['', Validators.required],
  });

  save() {
    this.productService.createProduct(this.productForm.value).subscribe((res) => {
      Swal.fire('Nuevo Producto', `Creado correctamente`, 'success');
      this.router.navigate(['/home/products']);
    });
  }

  isValid(campo: string) {
    return this.productForm.controls[campo].errors && this.productForm.controls[campo].touched;
  }
}
