import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { todos } from "src/app/model/todos.mock";
import { TodosService } from "src/app/services/todos.service";
import { TodoCardMock as TodoCardComponentMock } from "./todo-card.mock.component";
import { TodoListComponent } from "./todo-list.component";

describe('TodoListComponent', () => {
  const sampleTodos = todos;

  let fakeTodosService: TodosService;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    fakeTodosService = jasmine.createSpyObj('TodosService', {
      delete: undefined
    });

    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoCardComponentMock],
      providers: [{ provide: TodosService, useValue: fakeTodosService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    fixture.componentInstance.todos = sampleTodos;
    fixture.detectChanges();
  });

  it('mounts', () => {
    expect(fixture).toBeTruthy();
  });

  it('renders a TodoCard for each of the data entries', () => {
    const todoCards = fixture.debugElement.queryAll(By.directive(TodoCardComponentMock));

    expect(todoCards.length).toBe(sampleTodos.length);
  });

  it('deletes a todo when it gets a (delete) event from a TodoCard', () => {
    const idToDelete = 1;
    const firstTodoComponent = fixture.debugElement.query(By.directive(TodoCardComponentMock));

    firstTodoComponent.triggerEventHandler('delete', idToDelete);

    expect(fakeTodosService.delete).toHaveBeenCalledWith(idToDelete);
  });

  it('sends a (todoEdit) event when it receives an (edit) event from a TodoCard', () => {
    const eventEditId = 1;
    let actualEditId: number | undefined;
    fixture.componentInstance.todoEdit.subscribe(id => actualEditId = id);

    const firstTodoComponent = fixture.debugElement.query(By.directive(TodoCardComponentMock));

    firstTodoComponent.triggerEventHandler('edit', eventEditId);

    expect(actualEditId).toBe(eventEditId);
  });
})
