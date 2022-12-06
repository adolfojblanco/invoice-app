import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, Observable } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

export interface User {
  name: string;
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
    `
      .example-form {
        width: 100%;
      }

      .example-full-width {
        width: 100%;
      }
    `,
  ],
})
export class InvoiceComponent implements OnInit {
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );
  }
  myControl = new FormControl<string | User>('');
  options: User[] = [{ name: 'Mary' }, { name: 'Shelley' }, { name: 'Igor' }];
  filteredOptions: Observable<User[]>;

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) => option.name.toLowerCase().includes(filterValue));
  }
}
