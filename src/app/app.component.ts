import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './model/todo.model';
import { ThemeService } from './services/theme.service';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';
  todos$?: Observable<Todo[]>;

  constructor(
    private todosService: TodosService,
    public themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$;
    this.todosService.getAll();
  }

  handleDelete(id: number) {
    this.todosService.delete(id);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
