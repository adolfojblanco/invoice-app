import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  dataSource = this.clients;
  displayedColumns: string[] = ['id', 'name', 'surname1', 'email', 'createAt', 'actions'];
  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    /**
      Obtiene los clientes de la base ded datos
    */
    this.clientService.getAllClients().subscribe((res) => (this.dataSource = res));
  }
}
