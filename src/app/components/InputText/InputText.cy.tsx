import InputText from './TestComponent';

describe('InputText Component', () => {
  beforeEach(() => {
    cy.mount(<InputText required placeholder="Test Placeholder" />);
  });

  it('should display a text input with a placeholder', () => {
    cy.get('[data-testid="input"]').should(
      'have.attr',
      'placeholder',
      'Test Placeholder'
    );
  });

  it('should allow text input', () => {
    cy.get('[data-testid="input"]').type('Hello, Cypress');
    cy.get('[data-testid="input"]').should('have.value', 'Hello, Cypress');
  });
});

describe('InputText Component - Error State', () => {
  beforeEach(() => {
    cy.mount(
      <InputText
        required
        placeholder="Test Placeholder"
        error={true}
        messageError="This is an error message"
      />
    );
  });

  it('should display an error message and red border when an error is present', () => {
    cy.get('[data-testid="input-container"]').should(
      'have.class',
      'border-secondary'
    );
    cy.get('.text-secondary').should('contain', 'This is an error message');
  });
});

describe('InputText Component - Disabled State', () => {
  beforeEach(() => {
    cy.mount(
      <InputText
        required={false}
        placeholder="Test Placeholder"
        disabled={true}
      />
    );
  });

  it('should disable the input field when disabled prop is set to true', () => {
    cy.get('[data-testid="input"]').should('be.disabled');
  });
});

describe('InputText Component - Required State', () => {
  beforeEach(() => {
    cy.mount(
      <InputText
        placeholder="Test Placeholder"
        label="Test Label"
        required={true}
      />
    );
  });

  it('should show an asterisk (*) next to the label when required is true', () => {
    cy.get('[data-testid="input-label"]').contains('*').should('exist');
  });
});
