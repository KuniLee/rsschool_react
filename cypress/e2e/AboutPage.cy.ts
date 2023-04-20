describe('The main page', () => {
  beforeEach(() => {
    cy.visit('about')
  })
  it('should have render heading...', () => {
    cy.get('h1').contains('About Page').should('exist')
  })
})
