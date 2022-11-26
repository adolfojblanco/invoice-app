import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Client } from '../models/client';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private urlEndPoint: string = `${environment.apiUrl}/clients`;
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  /**
   * Obtiene todos los clientes
   * @returns client[]
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}`);
  }

  /**
   * Obtiene todos los clientes paginados
   * @returns client[]
   */
  getAllClientsPaginate(page: number): Observable<any[]> {
    console.log('Me ejecuto');
    return this.http.get<any[]>(`${this.urlEndPoint}/page/${page}`).pipe(
      tap((res: any) => {
        (res.content as Client[]).forEach((client) => {
          console.log(client.name);
        });
      })
    );
  }

  /**
   * Devuelve un cliente por su id
   * @param id clientId
   * @returns client
   */
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`, { headers: this.headers }).pipe(
      catchError((e) => {
        this.router.navigate(['/clients']);
        this.toastr.error(`${e.error.message}`, 'Error!');
        return throwError(() => e);
      })
    );
  }

  /**
   * Registro de cliente
   * @param client
   * @returns client
   */
  createNewClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlEndPoint}`, client, { headers: this.headers }).pipe(
      catchError((e) => {
        if (e.error.error.includes('Duplicate')) {
          this.toastr.error(`Este email ya esta registrado`, 'Error!');
          return throwError(() => e);
        }
        this.toastr.error(`${e.error.message}`, 'Error!');
        return throwError(() => e);
      })
    );
  }

  /**
   * Registro de cliente
   * @param client
   * @returns client
   */
  editClient(client: Client): Observable<Client> {
    return this.http
      .put<Client>(`${this.urlEndPoint}/${client.id}`, client, {
        headers: this.headers,
      })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clients']);
          this.toastr.error(`${e.error.message}`, 'Error!');
          return throwError(() => e);
        })
      );
  }

  /**
   * Elimina un cliente de la bd
   * @param id
   * @returns id
   */
  deleteClient(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndPoint}/${id}`, { headers: this.headers }).pipe(
      catchError((e) => {
        this.router.navigate(['/clients']);
        this.toastr.error(`${e.error.message}`, 'Error!');
        return throwError(() => e);
      })
    );
  }
}
