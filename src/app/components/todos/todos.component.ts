import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/model/todo.model';
import { ThemeService } from 'src/app/services/theme.service';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  title = 'angular-todo';
  todos$?: Observable<Todo[]>;

  constructor(
    public todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$;
    this.todosService.getAll();
  }

  handleEdit(id: number) {
    this.router.navigate(['edit', id]);
  }

  createTodo() {
    // TODO: creation flow: this can be either showing a form on the same page as the todo entries OR reusing the edit page
    console.log('Implement me!');
  }
}
