import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input() todos!: Todo[] | null;

  @Output() todoDelete = new EventEmitter<number>();
}
