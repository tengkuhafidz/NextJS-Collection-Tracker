// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (identifier, password) => {
	// WHEN user visits /login
	cy.visit('/login')
	// AND types in valid credentials to login
	cy.findByPlaceholderText('Email / Username').type(identifier)
	cy.findByPlaceholderText('Password').type(password)
	cy.findByRole('button', {name: 'Login'}).click()
})

Cypress.Commands.add('captureNric', nric => {
	// WHEN user provides valid beneficiary nric
	cy.findByPlaceholderText('NRIC').type(nric)
	cy.findByRole('button', {name: 'Next'}).click()
})

Cypress.Commands.add('recordCollection', (nric, count, maxCount = 3) => {
	// WHEN user provides valid beneficiary nric
	cy.captureNric(nric)
	// THEN user should be redirected to collection tracker form
	cy.url().should('include', '/form')
	// AND able to identify the beneficiary
	cy.findByText('hashim')
	// AND see his total collection count against the maximum for the day
	cy.findByText(`Collections Today: ${count} / ${maxCount}`)
	// WHEN user changes the quantity of units
	cy.findByRole('button', {name: '+'}).click()
	cy.findByRole('button', {name: '+'}).click()
	cy.findByRole('button', {name: '-'}).click()
	// THEN the quantity should update accordingly
	cy.findByText('2')
	// WHEN user records his collection
	cy.findByRole('button', {name: 'Submit'}).click()
})
