describe('Configure SEAT Ibiza', () => {
  beforeEach(() => {
    cy.visit('https://configurador.seat.es/seat-cc/configurator/LIVE/003/DEFAULT/es/car-selector');

    cy.get('#onetrust-group-container', { timeout: 5000 }).then(($container) => {
      if ($container.is(':visible')) {
        cy.get('#onetrust-accept-btn-handler').click();
      }
    });
  });

  it('should select the Ibiza Car', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > .vertical > .text').should('be.visible');
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.wait(2000);
    cy.get('.exploreSegment > h4.ng-star-inserted').should('be.visible');
  });

  it('should select model FX RM', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main', { scrollBehavior: 'center' }).scrollIntoView().should('be.visible');
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.wait(2000); 
    cy.get('seat-configuration-page-headline')
    .scrollIntoView()
    .should('be.visible');
  });

  it('should select default settings for motor', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.get('seat-filter-selector').scrollIntoView()
    cy.get(':nth-child(3) > header.ng-star-inserted > .mat-icon').should('be.visible');
    cy.get(':nth-child(5) > header.ng-star-inserted > .mat-icon').should('not.exist');
  });

  it('should select default settings for color and tiers', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.get('footer[_ngcontent-c30=""] > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    cy.get('seat-part-item-color.ng-star-inserted > .mat-icon').scrollIntoView().should('be.visible');
    cy.get(':nth-child(1) > .section > seat-part-section > .part-container > seat-part.ng-star-inserted > seat-part-item-interior-or-rim.ng-star-inserted')
    .scrollIntoView()
    .should('be.visible');
  });

  it('should select default settings for tapestry', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.get('footer[_ngcontent-c30=""] > seat-price-details-small > section > seat-button > main')
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    cy.get(':nth-child(1) > seat-part-item-interior-or-rim.ng-star-inserted > .circle > seat-selectable-container > seat-circle > img')
    .scrollIntoView()
    .should('be.visible');
  });

  it('should select default settings for addons', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.get('footer[_ngcontent-c30=""] > seat-price-details-small > section > seat-button > main')
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    let sectionIndex = 1;
    let sectionChildIndex = 1;
    let addButtonText = 'Añadir';

    while (sectionIndex <= 10 && sectionChildIndex <=2) {
      if (sectionIndex == 6 || sectionIndex == 9) {
        sectionIndex++;
        continue;
      }
      cy.get(`:nth-child(${sectionIndex}) > .section > seat-part-section > .part-container > :nth-child(${sectionChildIndex}) > .vertical > main[_ngcontent-c59=""] > seat-button.toggle-button > main > b`).then(($element) => {
        if ($element.length) {
          cy.wrap($element)
            .invoke('text')
            .should('equal', addButtonText);
        }
      });

      sectionIndex++;
    }
    
    cy.contains('Eliminar').should('not.exist');
  });

  it('should have correct price', () => {
    cy.get(':nth-child(1) > seat-car-selector-list-item > img.ng-star-inserted').click();
    cy.get(':nth-child(2) > .second-column > .seat-button-text > main').click();
    cy.get('footer[_ngcontent-c30=""] > seat-price-details-small > section > seat-button > main')
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .scrollIntoView()
    .click()
    cy.get('footer > seat-price-details-small > section > seat-button > main')
    .click()
    cy.get('header[_ngcontent-c65=""] > seat-price-box > [_ngcontent-c67=""] > seat-price-details')
    .scrollIntoView()
    .should('be.visible')
    cy.get('header[_ngcontent-c65=""] > seat-price-box > [_ngcontent-c67=""] > seat-price-details > main[_ngcontent-c68=""] > :nth-child(5) > :nth-child(2) > .h6')
    .invoke('text')
    .should('equal', '20.870 €');
    cy.get('.configuration-key').should(($elements) => {
      const text = $elements.text();
      expect(text).to.include('SCXXH');
    });

  });

});