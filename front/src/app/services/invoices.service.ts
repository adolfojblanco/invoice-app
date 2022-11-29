import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InvoicesService {
  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  private urlEndPoint: string = `${environment.apiUrl}/invoices`;

  getAllInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.urlEndPoint}`, {
      headers: this.authService.getToken(),
    });
  }

  /**
   * Obtiene una factura por su id
   * @param id invoice
   * @returns invoice
   */
  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.urlEndPoint}/${id}`, {
      headers: this.authService.getToken(),
    });
  }
}
