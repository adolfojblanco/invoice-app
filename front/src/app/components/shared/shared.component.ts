import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export class SharedComponent {
  constructor(private autServices: AuthService) {}

  logout() {
    this.autServices.logout();
  }
}
