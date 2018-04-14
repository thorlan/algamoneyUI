import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
    this.authService.login(usuario, senha)
      .then(() => {
        this.router.navigate(['lancamentos']);
      })
      .catch(error => {
        this.errorHandler.handle(error);
      });
  }

}
