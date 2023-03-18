import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { TodosService } from "../../services/todos.service";
import { Todo } from "../../model/todo.model";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {

  @Output()
  cancel = new EventEmitter();

  @Output()
  create = new EventEmitter<Todo>();

  form = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  errorMessage = '';

  constructor(private _formBuilder: FormBuilder, private _todoService: TodosService) {
  }

  onCreateClick() {
    const createTodo = {
      title: this.form.value.title ?? "",
      description: this.form.value.description ?? "",
    };
    this._todoService.create(createTodo).subscribe(
      {
        next: (id) => {
          this.create.emit({
            id,
            ...createTodo,
          });
        },
        error: (err) => {
          this.errorMessage = err.message;
        }
      });
  }

  onCancelClick() {
    this.cancel.emit();
  }
}
