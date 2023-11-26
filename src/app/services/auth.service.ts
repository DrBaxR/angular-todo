import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public clientId = "todos";
  public redirectUri = "http://localhost:4200/keycloak";
  public keycloakUri = "https://quay.keycloak.hq-hydra.hibyte.ro";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  retrieveToken(code: string): Observable<any> {
    let params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code', code);

    let headers =
      new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8' });

    return this.http.post(`${this.keycloakUri}/realms/internship/protocol/openid-connect/token`, params.toString(), { headers: headers })
      .pipe(
        tap(data => this.saveToken(data))
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("access_token");
  }

  logout() {
    localStorage.removeItem("access_token");
    location.reload();
  }

  getToken(): string | null {
    return localStorage.getItem("access_token");
  }

  saveToken(token: any) {
    localStorage.setItem("access_token", token.access_token)
  }

  redirectToKeycloak() {
    window.location.href =
      `${this.keycloakUri}/realms/internship/protocol/openid-connect/auth?response_type=code&scope=openid&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}`
  }
}
