/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'goofyDuck',
      username: 'cluck',
      password: 'qwerty'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('Bloglist App')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('cluck')
      cy.get('#password').type('qwerty')
      cy.get('#loginButton').click()
      cy.contains('logged in as goofyDuck')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('chuck')
      cy.get('#password').type('qwert')
      cy.get('#loginButton').click()
      cy.contains('Wrong Credentials')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('Log in').click()
        cy.get('#username').type('cluck')
        cy.get('#password').type('qwerty')
        cy.get('#loginButton').click()
        cy.contains('logged in as goofyDuck')
        cy.contains('Create a new blog').click()
        cy.get('#title').type('Grand Theft Auto V')
        cy.get('#author').type('rockstar games')
        cy.get('#url').type('https://www.rockstargames.com/games/V')
        cy.get('#createBlog').click()
        cy.contains('Cancel').click()
        cy.contains('Grand Theft Auto V')
      })

      describe('a new blog can be', function() {
        it('added', function() {
          cy.contains('Create a new blog').click()
          cy.get('#title').type('Grand Theft Auto V')
          cy.get('#author').type('rockstar games')
          cy.get('#url').type('https://www.rockstargames.com/games/V')
          cy.get('#createBlog').click()
          cy.contains('Cancel').click()
          cy.contains('Grand Theft Auto V')
        })
        it('liked', function() {
          cy.contains('View').click()
          cy.get('#updateLikes').click()
          cy.get('#updateLikes').contains('1')
        })
        it('deleted', function() {
          cy.contains('View').click()
          cy.contains('Remove').click()
          cy.contains('Nothing to show')
        })
      })


    })
  })
})