import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { Auth } from '../models/auth';

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
        tap((resp: any) => localStorage.setItem('token', resp.access_token)),
        tap((resp: any) => (this._auth = resp))
      );

    console.log(res);

    return res;
  }

  /**
   * Logout
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['./auth/login']);
  }
}
