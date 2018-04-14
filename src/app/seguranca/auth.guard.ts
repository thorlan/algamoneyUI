import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private route: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.isAccessTokenInvalido) {
        console.log('Navegação com acess token inválido. Obtendo novo token...');

         return this.authService.obterNovoAccessToken()
              .then( () => {
                if ( this.authService.isAccessTokenInvalido()) {
                  this.route.navigate(['/login']);
                  return false;
                }
                return true;
              });

      } else if (next.data.roles && !this.authService.temQualquerPermissao(next.data.roles) ) {
        this.route.navigate(['nao-autorizado']);
        return false;
      }
    return true;
  }
}
