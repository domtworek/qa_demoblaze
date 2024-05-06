/// <reference types="cypress" />
import 'cypress-network-idle';

const { newUser, newPasswd, usedUser, usedPasswd, phone } = require('../support/variables');

describe('Main page', () => {
  beforeEach(() => {
    cy.visit(`https://www.demoblaze.com/index.html`);
    // cy.waitForNetworkIdle(2000)
  })

  it('should allow to sign up with valid credentials', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').click().focused().type(newUser, {delay: 0});
    cy.get('#sign-password').click().focused().type(newPasswd, {delay: 0});
    cy.contains('.btn-primary', 'Sign up').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Sign up successful.');
    });
  });

  it(`shouldn't allow to sign up with alredy used username`, () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').click().focused().type(usedUser, {delay: 0});
    cy.get('#sign-password').click().focused().type(newPasswd, {delay: 0});
    cy.contains('.btn-primary', 'Sign up').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('This user already exist.');
    });
  });

  it(`shouldn't allow to sign up if username is empty`, () => {
    cy.get('#signin2').click();
    cy.get('#sign-password').click().focused().type(newPasswd, {delay: 0});
    cy.contains('.btn-primary', 'Sign up').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please fill out Username and Password.');
    });
  })

  it(`shouldn't allow to sign up if password is empty`, () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').click().focused().type(newUser, {delay: 0});
    cy.contains('.btn-primary', 'Sign up').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please fill out Username and Password.');
    });
  })

  it('should allow to log in with valid credentials', () => {
    cy.get('#login2').click();
    cy.get('#loginusername').click().focused().type(usedUser, {delay:0});
    cy.get('#loginpassword').click().focused().type(usedPasswd, {delay:0});
    cy.get('button').contains('Log in').click();
    cy.get('#nameofuser').contains('Welcome dtworek');
  });

  it(`shouldn't allow to log in with invalid username`, () => {
    cy.get('#login2').click();
    cy.get('#loginusername').click().focused().type(newUser , {delay: 0});
    cy.get('#loginpassword').click().focused().type(usedPasswd, {delay: 0});
    cy.get('button').contains('Log in').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('User does not exist.');
    });
  });

  it(`shouldn't allow to log in with invalid password`, () => {
    cy.get('#login2').click();
    cy.get('#loginusername').click().focused().type(usedUser, {delay: 0});
    cy.get('#loginpassword').click().focused().type(newPasswd, {delay: 0});
    cy.get('button').contains('Log in').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Wrong password.');
    });
  });

  it(`should allow to add product to cart`, () => {
    cy.get('#login2').click();
    cy.get('#loginusername').click().focused().type(usedUser, {delay:0});
    cy.get('#loginpassword').click().focused().type(usedPasswd, {delay:0});
    cy.get('button').contains('Log in').click();
    cy.get('#nameofuser').contains('Welcome dtworek');
    cy.get('a').contains(phone).click();
    cy.get('.name').contains(phone);
    cy.get('.btn-success').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Product added.');
    });
    cy.get('.nav-link').contains('Cart').click();
    cy.get('td').should('contain', phone);
  });
})