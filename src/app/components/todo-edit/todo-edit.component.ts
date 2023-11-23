import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Todo } from 'src/app/model/todo.model';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit {

  protected todo$: Observable<Todo | undefined> = new BehaviorSubject<Todo | undefined>(undefined);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private todosService: TodosService,
  ) { }

  ngOnInit(): void {
    const stringId = this.route.snapshot.paramMap.get("id");
    this.todo$.subscribe(todo => console.log(todo));

    if (stringId) {
      const id = Number.parseInt(stringId);

      this.todo$ = this.todosService.getOne(id);
    } else {
      this.todo$ = of(undefined);
    }
  }

  protected handleFormEdit(todo: Todo) {
    this.todosService.update(todo);
    this.router.navigate(['todos']);
  }
}
