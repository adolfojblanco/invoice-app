import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: [],
})
export class ClientComponent implements OnInit {
  client: Client;
  formName: string;
  btnName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('edit')) {
      this.formName = 'Edición de cliente';
      this.btnName = 'Editar';
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.clientService.getClient(id)))
        .subscribe((client) => {
          this.client = client;
          this.clientForm.setValue(this.client);
        });
    } else {
      this.formName = 'Nuevo Cliente';
      this.btnName = 'Guardar';
    }
  }

  clientForm: FormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname1: ['', [Validators.required, Validators.minLength(3)]],
    surname2: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    createdAt: [],
  });

  save() {
    if (this.clientForm.controls['id'].value) {
      this.clientService
        .editClient(this.client)
        .subscribe((res) => this.router.navigate(['/clients']));
    }
    this.clientService
      .createNewClient(this.clientForm.value)
      .subscribe((res) => this.router.navigate(['/clients']));
  }

  isValid(campo: string) {
    return this.clientForm.controls[campo].errors && this.clientForm.controls[campo].touched;
  }
}
