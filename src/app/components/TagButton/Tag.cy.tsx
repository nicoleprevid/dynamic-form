import {
  Status,
  Sizes,
  COLOR_BG,
  BUTTON_SIZE_VARIANTS,
  TEXT_SIZE_VARIANTS,
  COLOR_FONT,
} from './utils';
import TagButton from '.';
const statuses: Array<Status> = ['default', 'inactive', 'selectPrimary'];
const sizes: Array<Sizes> = ['sm', 'md', 'lg'];

describe('Tag Component', () => {
  it(`should render Tag with all statuses and sizes`, () => {
    statuses.forEach((status) => {
      sizes.forEach((size) => {
        cy.mount(
          <TagButton text="Texto desejado" status={status} size={size} />
        );

        //  estilo  com base no status
        cy.get('[data-testid=tag-button]').should(
          'have.class',
          COLOR_BG[status],
          BUTTON_SIZE_VARIANTS[size]
        );
        // texto
        cy.get('[data-testid=tag-text]')
          .should('have.class', COLOR_FONT[status], TEXT_SIZE_VARIANTS[size])
          .should('have.text', 'Texto desejado');
      });
    });
  });
});
