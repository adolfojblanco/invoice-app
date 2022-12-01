import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { switchMap } from 'rxjs';
import { Client } from '../../../models/client';
import Swal from 'sweetalert2';
import { InvoicesService } from '../../../services/invoices.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientService: ClientsService,
    private invoiceService: InvoicesService
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.clientService.getClient(id)))
      .subscribe((client) => {
        this.client = client;
        this.dataSource = client.invoices;
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

  deleteInvoice(id: number) {
    Swal.fire({
      title: `Estas seguro que quieres elimanar a esta factura?`,
      text: 'Esto no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.deleteInvoice(id).subscribe((res) => {
          Swal.fire('Borrado!', 'Se elimino la factura.', 'success');
        });
        this.dataSource = this.dataSource.filter((i) => i.id !== id);
      }
    });
  }
}
