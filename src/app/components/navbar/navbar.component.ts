import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private readonly router: Router) { }

  logout() {
    localStorage.removeItem('loginData');
    this.router.navigate(['/login']);
  }

  loadAllAlbumsRoute() {
    this.router.navigate(['/albums']);
  }

}
