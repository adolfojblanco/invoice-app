import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private urlEndPoint: string = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}`, {
      headers: this.authService.getToken(),
    });
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.urlEndPoint}`, product, {
      headers: this.authService.getToken(),
    });
  }

  /**
   * Busqueda de un producto por el nombre
   * @param term termino de busqueda
   * @returns product[]
   */
  searchProduct(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/search/${term}`, {
      headers: this.authService.getToken(),
    });
  }

  /**
   * Busqueda de un producto por su id
   * @param id del producto
   * @returns product
   */
  findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.urlEndPoint}/${id}`, {
      headers: this.authService.getToken(),
    });
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http
      .delete<Product>(`${this.urlEndPoint}/${id}`, {
        headers: this.authService.getToken(),
      })
      .pipe(
        catchError((e) => {
          console.log(e);
          return throwError(() => e);
        })
      );
  }
}
