import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthGuardService } from './guard/auth-guard.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authGuardService: AuthGuardService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verifica se o usuário está autenticado
    const isAuthenticated = this.authGuardService.isAuthenticated();

    // Se o usuário estiver autenticado, permite o acesso à rota
    if (isAuthenticated) {
      return true;
    }

    // Se o usuário não estiver autenticado, redireciona para a página de login
    this.router.navigate(['/login']);
    return false;
  }
  
  

}
