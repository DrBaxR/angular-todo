import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Todo } from '../model/todo.model';
import { todos } from '../model/todos.mock';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private data: Todo[] = todos;

  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable().pipe(delay(500));

  constructor() { }

  getAll() {
    this.todosSubject.next(this.data);
  }

  delete(id: number) {
    this.data = this.data.filter(todo => todo.id != id);
    this.todosSubject.next(this.data);
  }

  update(newValue: Todo) {
    const otherTodos = this.data.filter(todo => todo.id != newValue.id);
    this.data = [newValue, ...otherTodos];
    this.todosSubject.next(this.data);
  }

  create(todo: Todo) {
    let nextId = 0;
    this.data.forEach(todo => { if (todo.id > nextId) { nextId = todo.id } });
    todo.id = nextId + 1;

    this.data.push(todo);
    this.todosSubject.next(this.data);
  }
}
