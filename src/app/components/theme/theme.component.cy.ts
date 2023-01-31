import { ThemeMockService } from 'src/app/services/theme.mock.service';
import { ThemeService } from 'src/app/services/theme.service';
import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  beforeEach(() => {
    cy.mount(ThemeComponent, {
      providers: [{ provide: ThemeService, useClass: ThemeMockService }]
    })
  })

  it('starts on light theme', () => {
    cy.get('[data-cy=theme]').should('contain.text', 'Light')
  })

  it('toggles theme when clicking button', () => {
    cy.get('[data-cy=theme-button]').click();
    cy.get('[data-cy=theme]').should('contain.text', 'Dark')
  })
  
  it('goes back to light theme when clicking again', () => {
    cy.get('[data-cy=theme-button]').click();
    cy.get('[data-cy=theme-button]').click();
    cy.get('[data-cy=theme]').should('contain.text', 'Light')
  })
});
