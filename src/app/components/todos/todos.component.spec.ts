import { Location } from "@angular/common";
import { byTestId, createRoutingFactory, SpectatorRouting } from "@ngneat/spectator";
import { ThemeService } from "src/app/services/theme.service";
import { TodosService } from "src/app/services/todos.service";
import { TodoCreateComponent } from "../todo-create/todo-create.component";
import { TodoEditComponent } from "../todo-edit/todo-edit.component";
import { TodoListComponent } from "../todo-list/todo-list.component";
import { TodosComponent } from "./todos.component";

describe('TodosComponent', () => {
  let spectator: SpectatorRouting<TodosComponent>;

  const createComponent = createRoutingFactory({
    component: TodosComponent,
    declarations: [TodoListComponent],
    providers: [TodosService, ThemeService],
    stubsEnabled: false,
    routes: [
      { path: '', component: TodosComponent },
      { path: 'edit/:id', component: TodoEditComponent },
      { path: 'create', component: TodoCreateComponent },
    ]
  });

  beforeEach(() => {
    spectator = createComponent();
  })

  it('mounts', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('navigates to /edit/:id on (todoEdit) event', async () => {
    const editId = 1;
    const todoList = spectator.query(TodoListComponent);
    todoList?.todoEdit.emit(editId);

    await spectator.fixture.whenStable();
    expect(spectator.inject(Location).path()).toBe(`/edit/${editId}`);
  });

  it('navigates to /create on "+" button click', async () => {
    spectator.click(byTestId('create-button'));
    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe('/create');
  });

  it('toggles theme on "Theme" button click', () => {
    spectator.click(byTestId("theme-button"));

    expect(spectator.inject(ThemeService).dark).toBeTrue();
  });
});
