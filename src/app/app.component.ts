import { Component, OnInit } from '@angular/core';
import { TodosService } from './services/todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-todo';

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.todosService.getAll().subscribe(todos => console.log(todos));
  }
}
