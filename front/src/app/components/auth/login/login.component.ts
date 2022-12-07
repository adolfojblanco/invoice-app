import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `

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
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    /** Si el usuario ya esta autenticado redirigimos al inicio */
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['./home/']);
    }
  }

  formLogin: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    this.authService.login(this.formLogin.value).subscribe((res) => {
      if (res.access_token) {
        this.router.navigate(['./home/']);
      }
    });
  }

  isValid(campo: string) {
    return this.formLogin.controls[campo].errors && this.formLogin.controls[campo].touched;
  }
}
