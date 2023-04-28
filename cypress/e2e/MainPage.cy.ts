describe('The main page', () => {
  beforeEach(() => {
    cy.visit('main')
  })
  it('should have search input...', () => {
    cy.get('input[type="text"]').should('exist')
  })

  it('should save input value...', () => {
    cy.get('input[type="text"]').type('Value').type('{enter}')
    cy.get('a').contains(/form/i).click().wait(100)
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/form')
    })
    cy.get('a').contains(/main/i).click()
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/main')
    })
    cy.get('input[type="text"]').should('have.value', 'Value')
  })

  it('should render cards, open one, and close it...', () => {
    cy.get('[data-testid="card"]').should('have.length', 12)
    cy.get('[data-testid="popup"]').should('not.be.visible')
    cy.get('[data-testid="card"]').first().click()
    cy.get('[data-testid="popup"]').should('be.visible')
    cy.get('.sr-only').contains(' Close menu ').parent().click()
    cy.get('[data-testid="popup"]').should('not.be.visible')
  })

  it('should change pages...', () => {
    // prettier-ignore
    cy.get('span')
      .contains('1')
      .should('to.be')
      .should('have.class', 'bg-blue-700')
      .next()
      .click()
    cy.intercept(/\/anime?q=&limit=12&page=2/)
    cy.get('span').contains('2').should('have.class', 'bg-blue-700')
  })
})
