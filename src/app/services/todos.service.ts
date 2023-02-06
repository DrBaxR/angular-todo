import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Todo } from '../model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private data: Todo[] = [
    {
      id: 1,
      dueDate: new Date(),
      title: 'Workshop Angular',
      description: 'Concept for an introductory Angular workshop',
    },
    {
      id: 2,
      dueDate: new Date(),
      title: 'Mock data',
      description: 'Make the mock data that the project will use',
    },
    {
      id: 3,
      dueDate: new Date(),
      title: 'Components',
      description: 'Implement the components of the TODO list web app',
    },
  ]

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
