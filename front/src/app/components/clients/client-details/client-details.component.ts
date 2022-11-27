import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { empty, switchMap } from 'rxjs';
import { Client } from '../../../models/client';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styles: [
    `
      .img {
        max-width: 280px;
        max-height: 220px;
      }
    `,
  ],
})
export class ClientDetailsComponent implements OnInit {
  selectedFile: File;
  client: Client = new Client();

  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientsService) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.clientService.getClient(id)))
      .subscribe((client) => {
        this.client = client;
      });
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  selectedPicture(event: any) {
    this.selectedFile = event.target.files[0];
  }

  savedPicture() {
    this.clientService.uploadImage(this.selectedFile, this.client.id).subscribe((res) => {
      this.client = res;
    });
  }
}
