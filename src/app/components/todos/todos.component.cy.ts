import { ThemeMockService } from "src/app/services/theme.mock.service";
import { ThemeService } from "src/app/services/theme.service";
import { TodosService } from "src/app/services/todos.service";
import { ThemeComponent } from "../theme/theme.component";
import { TodoCardComponent } from "../todo-card/todo-card.component";
import { TodosComponent } from "./todos.component";

describe('TodosComponent', () => {
  beforeEach(() => {
    cy.mount(TodosComponent, {
      declarations: [TodoCardComponent, ThemeComponent],
      providers: [
        { provide: TodosService, useClass: TodosService },
        { provide: ThemeService, useClass: ThemeMockService }
      ]
    });
  })

  it('should display mock data', () => {
    cy.get('[data-cy=card]').should('have.length', 3);
  })

  it('should change theme', () => {
    cy.get('button').contains('Theme').click();
    cy.get('span').contains('Dark');
  })

  it('should delete entry when clicking delete button', () => {
    cy.contains('Delete').click();
    cy.get('[data-cy=card]').should('have.length', 2);

    cy.contains('Delete').click();
    cy.get('[data-cy=card]').should('have.length', 1);

    cy.contains('Delete').click();
    cy.get('[data-cy=card]').should('not.exist');
  })
});
