import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from '../../models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
  dataSource = this.products;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProduct().subscribe((res) => {
      this.dataSource = res;
      console.log(this.dataSource);
    });
  }

  deleteProduct(product: Product) {
    Swal.fire({
      title: `Estas seguro que quieres eliminar: ${product.name}`,
      text: 'Esto no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product.id).subscribe((res) => {
          Swal.fire('Borrado!', 'El registro se elimino.', 'success');
        });
        this.dataSource = this.dataSource.filter((c) => c.id !== product.id);
      }
    });
  }
}
