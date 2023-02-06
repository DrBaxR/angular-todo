import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss']
})
export class TodoCreateComponent {

  constructor(
    private todosService: TodosService,
    private router: Router
  ) { }

  handleSubmit(todo: Todo) {
    this.todosService.create(todo);
    this.router.navigate(['todos']);
  }
}
