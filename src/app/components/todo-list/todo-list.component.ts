import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos!: Todo[] | null;

  @Output() todoEdit = new EventEmitter<number>();

  constructor(
    private todoService: TodosService
  ) { }

  deleteTodo(id: number) {
    this.todoService.delete(id);
  }
}
