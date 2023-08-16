import { Component } from '@angular/core';
import { AuthGuardService } from '../guard/auth-guard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authGuardService: AuthGuardService ,private router: Router) {}

  login() {
    this.authGuardService.login(this.email, this.password).subscribe(
      (response) => {
        // console.log(response);
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/editposts']);
      },
      (error) => {
        console.error(error); // Exemplo: Aqui você pode exibir uma mensagem de erro no login.
      }
    );
  }

  logout() {
    // Remove o token do LocalStorage
    localStorage.removeItem('auth_token');

    // Chama a rota de logout no backend (opcional, apenas se você quiser fazer alguma ação no backend)
    this.authGuardService.logout().subscribe(
      (response) => {
        // Sucesso - Faça algo aqui, como redirecionar para a página de login
      },
      (error) => {
        // Erro - Faça algo aqui, como exibir uma mensagem de erro
      }
    );
  }
}
