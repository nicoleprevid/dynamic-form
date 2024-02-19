import Button from './index';

describe('Button component', () => {
  it('should show button text', () => {
    cy.mount(
     
        <Button text="Botão" />
     
    );
    cy.contains('[data-testid="button"]', 'Botão');
    cy.get('[data-testid="button-icon"]').should('not.exist');
  });

  it('should call handler function on click', () => {
    const onClickHandler = cy.stub().as('onClickHandler');
    cy.mount(
        <Button text="Botão" onClick={onClickHandler} />
    );

    cy.get('[data-testid="button"]').click();
    cy.get('@onClickHandler').should('have.been.calledOnce');
  });

  it('should be accessible via keyboard navigation', () => {
    const onClickHandler = cy.stub().as('onClickHandler');
    cy.mount(
        <Button text="Botão" onClick={onClickHandler} />
    );

    cy.get('[data-testid="button"]').focus().type('{enter}');
    cy.get('@onClickHandler').should('have.been.calledOnce');
  });

  it('should change its state on hover', () => {
    cy.mount(
        <Button text="Botão" />
    );
    cy.get('[data-testid="button"]').trigger('mouseover');
  });

});
