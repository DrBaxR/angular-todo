import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
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

  constructor() { }

  getAll(): Observable<Todo[]> {
    return of(this.data).pipe(delay(1000));
  }
}
