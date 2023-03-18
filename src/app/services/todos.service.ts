import { Injectable } from '@angular/core';
import { Todo, TodoCreate } from '../model/todo.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private baseUrl = 'http://localhost:5051/api/v1/todo';

  constructor(private httpClient: HttpClient) {
  }

  getAll() {
    return this.httpClient.get<Todo[]>(`${this.baseUrl}`);
  }

  delete(title: string) {
    return this.httpClient.delete<Todo>(`${this.baseUrl}/delete`, {
      params: {
        title: title
      }
    });
  }

  update(newValue: Todo) {
    // TODO: overwrite todo with 'newValue'
  }

  create(todo: TodoCreate) {
    return this.httpClient.post<number>(`${this.baseUrl}/create`, todo);
  }
}
