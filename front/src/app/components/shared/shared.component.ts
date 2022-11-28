import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css'],
})
export class SharedComponent implements OnInit {
  user_name: string = '';

  constructor(private autServices: AuthService) {}

  ngOnInit(): void {
    const { user_name } = this.autServices.getLogedUser();
    this.user_name = user_name;
  }

  logout() {
    this.autServices.logout();
  }
}
