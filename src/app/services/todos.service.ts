import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { data } from '../model/todo.mock';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private data = data;

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
    // TODO: overwrite todo with 'newValue'
  }

  create(todo: Todo)  {
    // TODO: create new todo
  }
}
