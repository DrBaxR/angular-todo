describe('Todo Items', () => {
  it('creates a todo item', () => {
    // setup
    cy.visit('http://localhost:4200');
    cy.get('app-todo-card').should('have.length', 3);
    cy.contains("+").click();


    // act
    cy.get('[data-testid=title-input]').type('Example TODO');
    cy.get('[data-testid=due-date-input]').type('2023-01-01');
    cy.get('[data-testid=description-input]').type('Example TODO description');
    cy.get('[data-testid=submit-button]').click();

    // assert
    cy.get('app-todo-card').should('have.length', 4);
  })
})
