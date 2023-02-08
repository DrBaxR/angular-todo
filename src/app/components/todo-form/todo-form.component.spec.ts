import { ReactiveFormsModule } from "@angular/forms";
import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { Todo } from "src/app/model/todo.model";
import { TodoFormComponent } from "./todo-form.component";

function datesEqual(a: Date | undefined, b: Date | undefined): boolean {
  if (a == undefined || b === undefined) {
    return false;
  }

  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

describe('TodoFormComponent', () => {
  let spectator: Spectator<TodoFormComponent>;
  const createComponent = createComponentFactory({
    component: TodoFormComponent,
    imports: [ReactiveFormsModule]
  });

  const todo: Todo = {
    id: 1,
    title: 'test title',
    dueDate: new Date(2023, 0, 1),
    description: 'test description'
  };

  beforeEach(() => { spectator = createComponent() });

  it('mounts', () => {
    expect(spectator).toBeTruthy();
  });

  it('makes fields be empty on no input given', () => {
    const titleField = spectator.query(byTestId('title-input'));
    expect(titleField).toHaveValue('');

    const descriptionField = spectator.query(byTestId('description-input'));
    expect(descriptionField).toHaveValue('');

    const dueDateField = spectator.query(byTestId('due-date-input'));
    expect(dueDateField).toHaveValue('');
  });

  it('populates fields with properties of input todo item', () => {
    spectator.setInput({ initialTodo: todo });

    const titleField = spectator.query(byTestId('title-input'));
    expect(titleField).toHaveValue(todo.title);

    const descriptionField = spectator.query(byTestId('description-input'));
    expect(descriptionField).toHaveValue(todo.description);

    const dueDateField = spectator.query(byTestId('due-date-input'));
    expect(dueDateField).toHaveValue('2023-01-01');
  });

  it('emits event on submit button click', () => {
    let actualTodo: Todo | undefined;
    spectator.component.formSubmit.subscribe(todo => actualTodo = todo);

    spectator.setInput({ initialTodo: todo });
    spectator.click(byTestId('submit-button'));

    expect(actualTodo?.description).toBe(todo.description);
    expect(actualTodo?.title).toBe(todo.title);
    expect(datesEqual(actualTodo?.dueDate, todo.dueDate)).toBeTruthy();
  });

  it('emits changed value after fields changed', () => {
    let actualTodo: Todo | undefined;
    spectator.component.formSubmit.subscribe(todo => actualTodo = todo);
    
    const newTitle = 'other title';
    spectator.setInput({ initialTodo: todo });
    spectator.typeInElement(newTitle, byTestId('title-input'));
    spectator.click(byTestId('submit-button'));

    expect(actualTodo?.title).toBe(newTitle);
  })
});
