import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { switchMap } from 'rxjs';
import { Client } from '../../../models/client';
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
  panelOpenState = false;
  selectedFile: File;
  client: Client = new Client();
  dataSource = this.client.invoices;

  constructor(private activatedRoute: ActivatedRoute, private clientService: ClientsService) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.clientService.getClient(id)))
      .subscribe((client) => {
        this.client = client;
        this.dataSource = client.invoices;
        console.log(this.client);
      });
  }

  displayedColumns: string[] = ['id', 'description', 'createdAt', 'grandTotal', 'actions'];

  selectedPicture(event: any) {
    this.selectedFile = event.target.files[0];
  }

  /**
   * Subir foto
   */
  savedPicture() {
    this.clientService.uploadImage(this.selectedFile, this.client.id).subscribe((res) => {
      this.client = res;
    });
  }
}
