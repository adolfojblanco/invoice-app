import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }
      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }
      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }
      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }
      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  formLogin: FormGroup = this.fb.group({
    username: ['ajblanco156', [Validators.required]],
    password: ['12345', [Validators.required]],
  });

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.authService.login(this.formLogin.value).subscribe((res) => {
      console.log(res);
      if (res.access_token) {
        this.router.navigate(['./home/clientes/listado']);
      }
    });
  }

  isValid(campo: string) {
    return this.formLogin.controls[campo].errors && this.formLogin.controls[campo].touched;
  }
}
