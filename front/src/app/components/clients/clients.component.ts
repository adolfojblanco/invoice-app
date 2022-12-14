import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import Swal from 'sweetalert2';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  dataSource = this.clients;
  displayedColumns: string[] = ['id', 'name', 'surname1', 'email', 'createAt', 'actions'];
  constructor(private clientService: ClientsService, private authService: AuthService) {}

  ngOnInit(): void {
    /**
      Obtiene los clientes de la base ded datos
    */
    this.clientService.getAllClients().subscribe((res) => (this.dataSource = res));
  }

  /**
   * Elimina un cliente
   * @param client
   */
  deleteClient(client: Client): void {
    Swal.fire({
      title: `Estas seguro que quieres elimanar a ${client.name} ${client.surname1}?`,
      text: 'Esto no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client.id).subscribe((res) => {
          Swal.fire('Borrado!', 'El registro se elimino.', 'success');
        });
        this.dataSource = this.dataSource.filter((c) => c.id !== client.id);
      }
    });
  }
  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.clientService.getAllClientsPaginate(e.pageIndex).subscribe((res: any) => {
      this.dataSource = res.content;
    });
  }
}
