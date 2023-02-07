import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser';
import { Todo } from 'src/app/model/todo.model';
import { TodoCardComponent } from './todo-card.component';

describe('TodoCardComponent', () => {
  let fixture: ComponentFixture<TodoCardComponent>;

  const sampleTodo: Todo = {
    id: 0,
    title: 'This is a title',
    description: 'This is a description',
    dueDate: new Date(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCardComponent);

    fixture.componentInstance.todo = sampleTodo;
    fixture.detectChanges();
  });

  it('mounts', () => {
    expect(fixture).toBeTruthy();
  });

  it('properly renders its input todo', () => {
    const titleElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid=title]')).nativeElement;
    expect(titleElement.textContent).toContain(sampleTodo.title);

    const descriptionElement: HTMLElement = fixture.debugElement.query(By.css('[data-testid=description]')).nativeElement;
    expect(descriptionElement.textContent).toContain(sampleTodo.description);
  });

  it('emits delete event when "Delete" button clicked', () => {
    let actualValue: number | undefined;
    fixture.componentInstance.delete.subscribe(value => actualValue = value);

    const debugElement = fixture.debugElement.query(By.css('[data-testid=delete]'));
    debugElement.triggerEventHandler('click', new Event('click'));

    expect(actualValue).toBe(sampleTodo.id);
  })

  it('emits edit event when "Edit" button clicked', () => {
    let actualValue: number | undefined;
    fixture.componentInstance.edit.subscribe(value => actualValue = value);

    const debugElement = fixture.debugElement.query(By.css('[data-testid=edit]'));
    debugElement.triggerEventHandler('click', new Event('click'));

    expect(actualValue).toBe(sampleTodo.id);
  })
});
