import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ErrorHandlerService } from './../error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  exibindoMenu = false;

  constructor(
    private logoutService: LogoutService,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    public authService: AuthService) {

  }

  logout() {
    this.logoutService.logout()
        .then( () => {
          this.router.navigate(['/login']);
        }).catch(error => this.errorHandlerService.handle(error));
  }

}
