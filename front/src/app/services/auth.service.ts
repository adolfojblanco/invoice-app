import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { tap } from 'rxjs';
import { Auth } from '../models/auth';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private http: HttpClient, private router: Router) {}

  login(login: Auth) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + environment.credentials,
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', login.username);
    params.set('password', login.password);

    const res = this.http
      .post(`${environment.oauthUrl}/token`, params, {
        headers: httpHeaders,
      })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.access_token),
            Swal.fire({
              icon: 'success',
              title: `Bienvenido ${login.username}`,
              showConfirmButton: false,
              timer: 1500,
            });
        }),
        tap((resp: any) => (this._auth = resp))
      );
    return res;
  }

  /**
   * Si existe el token lo devolvemos si no cerramos la sesion
   * @returns get token
   */
  getToken() {
    const token = localStorage.getItem('token');
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    if (token === null) {
      console.log('Token es nulo o invalido');
      // Hacemos un redirect al login
      this.router.navigate(['./auth/login']);
      return;
    }
    return httpHeaders;
  }

  /**
   * Si el cliente no esta autorizado
   */
  isNotAuthorize(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      Swal.fire({
        icon: 'error',
        title: `No estas autorizado`,
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/auth/login']);
      return true;
    }
    return false;
  }

  /**
   * Si esta autnticado
   * @returns token
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  /**
   * Obtenemos el token y si no esta expirados devolcemos el usario decodificado
   * @returns
   */
  getLogedUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      return decoded;
    }
    return null;
  }

  hasRoles(role: string): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwt_decode(token);
      if (decoded.authorities.includes(role)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Logout
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['./auth/login']);
  }
}
