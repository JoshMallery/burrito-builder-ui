describe('Burrito Builder Tests', () => {
  beforeEach(() => {
    cy.intercept('http://localhost:3001/api/v1/orders', {fixture: 'orders'})

    cy.visit('http://localhost:3000/')
  })

  it('Has a Title', () => {
    cy.get('h1').contains("Burrito Builder")
  })

  it('Has a Name Field', () => {
    cy.get('input').should('have.attr','name')
  })

  it('should have 13 buttons on the page', () => {
    cy.get('button').should('have.length',13)
  })

  it('should have all the ingredient names on the buttons', () => {
    cy.get('button').eq(0).contains('beans')
    cy.get('button').eq(1).contains('steak')
    cy.get('button').eq(2).contains('carnitas')
    cy.get('button').eq(3).contains('sofritas')
    cy.get('button').eq(4).contains('lettuce')
    cy.get('button').eq(5).contains('queso fresco')
    cy.get('button').eq(6).contains('pico de gallo')
    cy.get('button').eq(7).contains('hot sauce')
    cy.get('button').eq(8).contains('guacamole')
    cy.get('button').eq(9).contains('jalapenos')
    cy.get('button').eq(10).contains('cilantro')
    cy.get('button').eq(11).contains('sour cream')
  })

  it('should have a submit button', () => {
    cy.get('button').eq(12).contains('Submit Order')
  })

  it('should display 4 orders', () => {
    cy.get('.order').should('have.length',4)
  })

  it('should display order name and details', () => {
    cy.get('.order').eq(3).contains('Peter Jones')
    cy.get('.order').eq(3).contains('queso fresco')
    cy.get('.order').eq(3).contains('lettuce')
    cy.get('.order').eq(3).contains('pico de gallo')
    cy.get('.order').eq(3).contains('carnitas')
    cy.get('.order').eq(3).contains('beans')
    cy.get('.order').eq(3).contains('cilantro')
  })

  it('a new order should start off with nothing selected', () => {
    cy.get('p').contains("Nothing selected")
  })

  it('should be able to select items for an order', () => {
    cy.get('button').eq(0).click()
    cy.get('button').eq(2).click()
    cy.get('button').eq(8).click()

    cy.get('p').contains('Order: beans, carnitas, guacamole')
  })

  it('should be able to write a name for an order', () => {
    cy.get('input').type('Nice Haircut Robbie')

    cy.get('input').should('have.value','Nice Haircut Robbie')
  })

  it('should be able to place an order', () => {
    cy.intercept('POST','http://localhost:3001/api/v1/orders', {fixture: 'post'}).as('post')
    cy.get('button').eq(0).click()
    cy.get('button').eq(2).click()
    cy.get('button').eq(8).click()
    cy.get('input').type('Nice Haircut Robbie')

    cy.get('button').eq(12).click()

    cy.wait('@post')
    cy.get('.order').eq(4).contains('Nice Haircut Robbie')
    cy.get('.order').eq(4).contains('guacamole')
    cy.get('.order').eq(4).contains('beans')
    cy.get('.order').eq(4).contains('carnitas')
  })

  it('should get an error if Name is missing', () => {
    cy.get('button').eq(0).click()
    cy.get('button').eq(12).click()

    cy.get('h1').eq(1).contains('A Name and at least one ingredient is needed to submit an order!')
  })

  it('should get an error if there isn\'t at least one ingredient selected', () => {
    cy.get('input').type('Nice Haircut Robbie')
    cy.get('button').eq(12).click()

    cy.get('h1').eq(1).contains('A Name and at least one ingredient is needed to submit an order!')
  })

  it('should get an error if a blank order is submitted', () => {
    cy.get('button').eq(12).click()

    cy.get('h1').eq(1).contains('A Name and at least one ingredient is needed to submit an order!')
  })

});
