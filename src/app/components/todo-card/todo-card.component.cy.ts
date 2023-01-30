import { createOutputSpy } from "cypress/angular";
import { Todo } from "src/app/model/todo.model"
import { TodoCardComponent } from "./todo-card.component"

const title = 'Test TODO';
const description = 'This is a test TODO item that will be displayed in the card';

const todo: Todo = {
  id: 123,
  title,
  description,
  dueDate: new Date(2023, 0, 1)
};

describe('TodoCardComponent', () => {
  it('mounts', () => {
    cy.mount(TodoCardComponent)
  })

  it('displays data', () => {
    cy.mount(TodoCardComponent, {
      componentProperties: { todo }
    });

    cy.get('[data-cy=title]').should('contain.text', title);
    cy.get('[data-cy=due-date]').should('contain.text', 'Jan 1, 2023');
    cy.get('[data-cy=description]').should('contain.text', description);
  })

  it('sends events', () => {
    cy.mount(TodoCardComponent, {
      componentProperties: {
        todo,
        edit: createOutputSpy('editSpy'),
        delete: createOutputSpy('deleteSpy'),
      }
    });

    cy.get('[data-cy=delete-button]').click();
    cy.get('@deleteSpy').should('have.been.calledWith', 123);

    cy.get('[data-cy=edit-button]').click();
    cy.get('@editSpy').should('have.been.calledWith', 123);
  })
})
