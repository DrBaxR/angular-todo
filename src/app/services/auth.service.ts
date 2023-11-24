import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  'not-before-policy': number;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  session_state: string;
  token_type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  get accessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  constructor(
    private httpService: HttpClient,
    private router: Router,
  ) { }

  login(username: string, password: string): Observable<TokenResponse> {
    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);
    body.set('client_id', 'todos');
    body.set('grant_type', 'password');
    body.set('scope', 'openid');

    return this.httpService
      .post<TokenResponse>(`${environment.keycloakUrl}/token`, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .pipe(
        tap((res: TokenResponse) => {
          localStorage.setItem('access_token', res.access_token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

}
