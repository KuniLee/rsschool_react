describe('The form page', () => {
  beforeEach(() => {
    cy.visit('form')
  })

  it('should render form...', () => {
    cy.get('form[data-testid="form"]').should('exist').should('be.visible')
  })

  it('should validate fields...', () => {
    const testUser = {
      id: 11111,
      firstName: 'Name',
      surName: 'Surname',
      date: '2000-01-01',
      sex: 'male',
      country: 'RU',
      notifications: false,
      avatar: 'data:image/png;base64,aGVsbG8=',
    }

    const { getFName, getSName, getAvatar, getDate, getSelect, getMale, getAgree, submit } = {
      getFName: () => cy.get('input[placeholder="Insert firstname..."]'),
      getSName: () => cy.get('input[placeholder="Insert surname..."]'),
      getAvatar: () => cy.get('input[type=file]'),
      getDate: () => cy.get('input[type=date]'),
      getSelect: () => cy.get('select'),
      getMale: () => cy.get('#radio-male'),
      getAgree: () => cy.get('input[name=agreement]'),
      submit: cy.get('button').contains('Create'),
    }

    submit.click()
    getFName().parent().find('p').contains('This field is required').should('be.visible')
    getFName().type(testUser.firstName)
    submit.click()
    getFName().parent().find('p').should('not.exist')

    getSName().parent().find('p').contains('This field is required').should('be.visible')
    getSName().type(testUser.surName)
    submit.click()
    getSName().parent().find('p').should('not.exist')

    getAvatar().parent().find('p').contains('You should upload an image').should('be.visible')
    getAvatar().selectFile({
      contents: Cypress.Buffer.from('data:image/png;base64,aGVsbG8='),
      fileName: 'image.png',
      mimeType: 'image/png',
      lastModified: Date.now(),
    })
    submit.click()
    getAvatar().parent().find('p').contains('You should upload an image').should('not.exist')

    getDate().parent().find('p').contains('Set the date').should('be.visible')
    getDate().type(testUser.date)
    submit.click()
    getDate().parent().find('p').should('not.exist')

    getSelect().parent().find('p').contains('Choose country').should('be.visible')
    getSelect().select(testUser.country)
    submit.click()
    getDate().parent().find('p').should('not.exist')

    getMale().parent().parent().parent().find('p').contains('Choose one of the options').should('be.visible')
    getMale().check()
    submit.click()
    getDate().parent().parent().parent().find('p').contains('Choose one of the options').should('not.exist')

    getAgree().parent().parent().parent().find('p').contains('You should agree!').should('be.visible')
    getAgree().check()
    submit.click()
    getAgree().parent().parent().parent().find('p').should('not.exist')

    cy.get('[data-testid="card"]').should('exist')
    cy.log('created new user')
  })
})
