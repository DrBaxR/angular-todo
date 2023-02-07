import { ComponentFixture, TestBed } from "@angular/core/testing";
import { todos } from "src/app/model/todos.mock";
import { createComponentFactory, createSpyObject, Spectator, SpyObject } from '@ngneat/spectator';
import { TodoListComponent } from "./todo-list.component";
import { MockComponent } from 'ng-mocks';
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { TodosService } from "src/app/services/todos.service";

describe('TodoListComponent - Spectator', () => {
  const sampleTodos = todos;
  const createComponent = createComponentFactory({
    component: TodoListComponent,
    declarations: [MockComponent(TodoCardComponent)],
  })
  let spectator: Spectator<TodoListComponent>;
  let mockTodosService: SpyObject<TodosService>;

  beforeEach(() => {
    mockTodosService = createSpyObject(TodosService);

    spectator = createComponent({
      props: {
        todos: sampleTodos
      },
      providers: [{
        provide: TodosService, useValue: mockTodosService
      }]
    });
  })

  it('mounts', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('renders a TodoCard for each of the data entries', () => {
    const todoCards = spectator.queryAll(TodoCardComponent);
    expect(todoCards.length).toBe(sampleTodos.length);
  });

  it('deletes a todo when it gets a (delete) event from a TodoCard', () => {
    const deleteId = 1;
    spectator.query(TodoCardComponent)?.delete.emit(deleteId);

    expect(mockTodosService.delete).toHaveBeenCalledWith(deleteId)
  });

  it('sends a (todoEdit) event when it receives an (edit) event from a TodoCard', () => {
    let actualId: number | undefined;
    spectator.component.todoEdit.subscribe(id => actualId = id);

    const expectedId = 1;
    spectator.query(TodoCardComponent)?.edit.emit(expectedId);

    expect(actualId).toBe(expectedId);
  });
})
