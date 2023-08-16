import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {


  private backendUrl = 'http://localhost:5001/auth'; // Coloque a URL do seu backend aqui
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) { }

  register(registerData: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/register`, registerData);
  }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          console.log(response); // Check the response here
          if (response && response.token) {
            localStorage.setItem('auth_token', response.token);
          }
        })
      );
  }
  
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/logout`, {});
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    return !!token;
  }
  
}