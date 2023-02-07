import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "src/app/model/todo.model";

@Component({
  selector: 'app-todo-card',
  template: '',
})
export class TodoCardMock {
  @Input() todo?: Todo;

  @Output() delete = new EventEmitter<number>()
  @Output() edit = new EventEmitter<number>()
}
