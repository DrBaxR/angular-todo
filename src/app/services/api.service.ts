import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    @Inject(BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) { }

  getAll(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/todos`);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/todos/${id}`)
  }

  update(newValue: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/todos/${newValue.id}`, newValue);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/todos/${id}`);
  }
}
