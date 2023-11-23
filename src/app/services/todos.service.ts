import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Todo } from '../model/todo.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private data: Todo[] = [];

  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    this.http.get<Todo[]>(`${environment.baseUrl}/todos`).subscribe(todos => {
      this.data = todos;
      this.todosSubject.next(this.data);
    })
  }

  getOne(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${environment.baseUrl}/todos/${id}`).pipe(
      map(todo => {
        return {
          ...todo,
          dueDate: new Date(todo.dueDate)
        }
      })
    );
  }

  delete(id: number) {
    this.http.delete(`${environment.baseUrl}/todos/${id}`).subscribe(() => this.getAll());
  }

  update(newValue: Todo) {
    this.http.put(`${environment.baseUrl}/todos/${newValue.id}`, newValue).subscribe(() => this.getAll());
  }

  create(todo: Todo) {
    this.http.post(`${environment.baseUrl}/todos`, todo).subscribe(() => this.getAll());
  }
}
