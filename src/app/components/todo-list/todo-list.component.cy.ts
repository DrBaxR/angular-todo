import { TodoCardComponent } from "../todo-card/todo-card.component";
import { TodoListComponent } from "./todo-list.component";

describe('TodoListComponent', () => {
  it('mounts', () => {
    cy.mount(TodoListComponent, {
      declarations: [TodoCardComponent]
    });
  })
});
