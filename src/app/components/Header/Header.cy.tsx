import Header from ".";

describe('Header Component', () => {
  it('should render the Header component', () => {

    cy.mount(<Header/>);

    cy.get('[data-testid=menu-bar]').should('exist');

    cy.get('[data-testid=button-icon]').should('exist');

    cy.get('[data-testid=menu-bar] li').should('have.length', 2);
  });

});
