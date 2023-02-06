import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/model/todo.model';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {

  @Input() initialTodo: Todo | null | undefined;
  @Output() formSubmit = new EventEmitter<Todo>();

  protected todoForm = this.formBuilder.group({
    title: '',
    description: '',
    dueDate: '',
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialTodo']) {
      if (this.initialTodo) {
        const { title, description, dueDate } = this.initialTodo;
        this.todoForm.patchValue({ title, description, dueDate: this.formatDate(dueDate) });
      }
    }
  }

  private formatDate(date: Date): string {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();

    return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
  }

  protected handleSubmit() {
    const formValue = this.todoForm.value;
    const newTodo: Todo = {
      id: this.initialTodo?.id!,
      description: formValue.description!,
      title: formValue.title!,
      dueDate: new Date(formValue.dueDate!),
    }

    this.formSubmit.emit(newTodo);
  }
}
