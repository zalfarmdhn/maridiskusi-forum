/* eslint-disable no-undef */
/**
 * Login spec
 *  - should display login page correctly
 *  - should display alert when email is empty
 *  - should display alert when password is empty
 *  - should display alert when email and password are wrong
 *  - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display the login page', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Submit$/);
  });

  it('should display alert when username is empty', () => {
    // klik button tanpa mengisi username
    cy.get('button').contains(/^Submit$/).click();
    // menampilkan window.alert menampilkan pesan "Email is not allowed to be empty"
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // isi username dengan email
    cy.get('input[placeholder="Email"]').type('kopilatte@mail.com');

    // klik button tanpa mengisi password
    cy.get('button').contains(/^Submit$/).click();

    // menampilkan window.alert menampilkan pesan "Email is not allowed to be empty"
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi kolom email
    cy.get('input[placeholder="Email"]').type('kopilatte@mail.com');
    // mengisi kolom password dengan salah
    cy.get('input[placeholder="Password"]').type('wrongpassword');
    // memverifikasi window.alert agar menampilkan pesan "email or password is wrong"
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="Email"]').type('kopilatte@mail.com');
    // mengisi password
    cy.get('input[placeholder="Password"]').type('kopilatte123');
    // menekan tombol login
    cy.get('button').contains(/^Submit$/).click();
    // memverifikasi bahwa elemen yang ada di homepage ditampilkan
    cy.get('header').should('be.visible').find('nav');
  });
});
