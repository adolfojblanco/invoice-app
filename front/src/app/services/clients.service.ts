import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { Client } from '../models/client';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private urlEndPoint: string = `${environment.apiUrl}/clients`;
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  /**
   * Obtiene todos los clientes
   * @returns client[]
   */
  getAllClients(): Observable<Client[]> {
    return this.http
      .get<Client[]>(`${this.urlEndPoint}`, { headers: this.authService.getToken() })
      .pipe(
        catchError((e) => {
          this.authService.isNotAuthorize(e);
          return throwError(() => e);
        })
      );
  }

  /**
   * Obtiene todos los clientes paginados
   * @returns client[]
   */
  getAllClientsPaginate(page: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlEndPoint}/page/${page}`).pipe(
      catchError((e) => {
        this.authService.isNotAuthorize(e);
        return throwError(() => e);
      }),
      tap((res: any) => {
        (res.content as Client[]).forEach((client) => {});
      })
    );
  }

  /**
   * Devuelve un cliente por su id
   * @param id clientId
   * @returns client
   */
  getClient(id: number): Observable<Client> {
    return this.http
      .get<Client>(`${this.urlEndPoint}/${id}`, { headers: this.authService.getToken() })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clients']);
          this.authService.isNotAuthorize(e);
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
    return this.http
      .post<Client>(`${this.urlEndPoint}`, client, { headers: this.authService.getToken() })
      .pipe(
        catchError((e) => {
          if (e.error.error.includes('Duplicate')) {
            this.toastr.error(`Este email ya esta registrado`, 'Error!');
            return throwError(() => e);
          }
          this.authService.isNotAuthorize(e);
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
        headers: this.authService.getToken(),
      })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clients']);
          this.authService.isNotAuthorize(e);
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
    return this.http
      .delete<Client>(`${this.urlEndPoint}/${id}`, { headers: this.authService.getToken() })
      .pipe(
        catchError((e) => {
          this.router.navigate(['/clients']);
          this.authService.isNotAuthorize(e);
          return throwError(() => e);
        })
      );
  }

  /**
   * Subida de image de un cliente
   * @param file image
   * @param id client id
   * @returns client
   */
  uploadImage(file: File, id: number): Observable<Client> {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    let formData = new FormData();
    formData.append('file', file);
    formData.append('id', id.toString());

    return this.http
      .post<Client>(`${this.urlEndPoint}/upload`, formData, { headers: httpHeaders })
      .pipe(
        map((res: any) => res.client as Client),
        catchError((e) => {
          console.log(e);
          //this.authService.isNotAuthorize(e);
          return throwError(() => e);
        })
      );
  }
}
