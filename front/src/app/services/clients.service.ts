import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private urlEndPoint: string = `${environment.apiUrl}/clients`;
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los clientes
   * @returns client[]
   */
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.urlEndPoint}`);
  }
}
