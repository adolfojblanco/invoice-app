import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Client } from '../models/client';

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

  /**
   * Devuelve un cliente por su id
   * @param id clientId
   * @returns client
   */
  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.urlEndPoint}/${id}`);
  }

  /**
   * Registro de cliente
   * @param client
   * @returns client
   */
  createNewClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.urlEndPoint}`, client);
  }

  /**
   * Registro de cliente
   * @param client
   * @returns client
   */
  editClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlEndPoint}/${client.id}`, client);
  }
}
