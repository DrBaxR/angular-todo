import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/model/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  title = 'angular-todo';
  todos: Todo[] = [];

  showCreateForm = false;
  errorMessage = '';

  constructor(public todosService: TodosService, private router: Router) {
  }

  ngOnInit(): void {
    this.todosService.getAll().subscribe({
      next: (todos) => {
        this.todos = todos;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    })
  }

  handleDelete(title: string) {
    this.todosService.delete(title).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.title !== title);
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    })
  }

  handleEdit(id: number) {
    this.router.navigate(['edit', id]);
  }

  createTodo() {
    this.showCreateForm = true;
  }

  handleCreateCancel() {
    this.showCreateForm = false;
  }

  handleCreate(todo: Todo) {
    this.showCreateForm = false;
    this.todos.push(todo);
  }
}
