import IconButton from '.';
import { BUTTON_STATE_VARIANTS, LABEL_STATE_VARIANTS } from './utils';

const modes = [
  `default`,
  `defaultDark`,
  'active',
  'activeDark',
  'hover',
  'hoverDark',
  'click',
  'clickDark',
];
modes.forEach((mode) => {
  describe(`IconButton Component - Mode: ${mode}`, () => {
    it('should display IconButton in the correct state', () => {
      const state = mode.split('Dark')[0] as 'default' | 'active';
      const darkmode = mode.includes('Dark');

      cy.mount(
        <IconButton
          icon="home"
          label="label"
          state={state}
          darkmode={darkmode}
        />
      );

      // Testa a cor do botão no estado especificado
      cy.get('[data-testid="button-with-icon"]').should(
        'have.class',
        BUTTON_STATE_VARIANTS[mode]
      );
      //testa o estilo do texto
      cy.get('p').should('have.class', LABEL_STATE_VARIANTS[mode]);

      //testa se icone existe
      cy.get('[data-testid="button-icon"] img').should('exist');
      // Simula o hover
      cy.get('[data-testid="button-with-icon"]').trigger('mouseover');
      cy.get('[data-testid="button-with-icon"]').should(
        'have.class',
        BUTTON_STATE_VARIANTS[`hover${darkmode ? 'Dark' : ''}`]
      );

      // Simula o mousedown
      cy.get('[data-testid="button-with-icon"]').trigger('mousedown');
      cy.get('[data-testid="button-with-icon"]').should(
        'have.class',
        BUTTON_STATE_VARIANTS[`click${darkmode ? 'Dark' : ''}`]
      );

      // Simula o mouseup
      cy.get('[data-testid="button-with-icon"]').trigger('mouseup');
      cy.get('[data-testid="button-with-icon"]').should(
        'have.class',
        BUTTON_STATE_VARIANTS[`hover${darkmode ? 'Dark' : ''}`]
      );
    });
  });
});
