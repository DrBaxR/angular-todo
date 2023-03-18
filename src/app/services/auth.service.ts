import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5051';

  loggedInUser = new BehaviorSubject<string | undefined>(undefined);

  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<string>(`${this.baseUrl}/api/login`, { username, password }, {
      headers,
      responseType: 'text' as 'json' // this is a workaround because the responseType allows only 'json'
    })
      .pipe(tap((token) => {
        this.loggedInUser.next(username);
        localStorage.setItem('token', token)
      }));
  }

  logout() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.httpClient.post<string>(`${this.baseUrl}/api/logout`, undefined, {
      headers,
      responseType: 'text' as 'json' // this is a workaround because the responseType allows only 'json'
    })
      .pipe(tap(() => {
        this.loggedInUser.next(undefined);
        localStorage.removeItem('token');
      }));
  }
}
