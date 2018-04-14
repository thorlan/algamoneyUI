
import { RequestOptions, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import {  AuthConfig, AuthHttp } from 'angular2-jwt';

import { LogoutService } from './logout.service';
import { LoginComponent } from './login/login.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { MoneyHttp } from './money-http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';


export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
  const config = new AuthConfig({
    globalHeaders: [
      {'Content-Type': 'application/json' }
    ]
  });

  return new MoneyHttp(auth, config, http, options);
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,

    SegurancaRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [AuthService , Http, RequestOptions]
    },
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }
