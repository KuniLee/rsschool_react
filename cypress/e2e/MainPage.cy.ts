describe('The main page', () => {
  beforeEach(() => {
    cy.visit('main')
  })
  it('should have search input...', () => {
    cy.get('input[type="text"]').should('exist')
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
    cy.intercept(/\/anime?q=&limit=12&page=1/)
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
