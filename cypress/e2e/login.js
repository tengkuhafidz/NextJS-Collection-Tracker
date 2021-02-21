describe('Login', () => {
	it('should disable button given empty password', () => {
		// WHEN user visits /login
		cy.visit('/login')
		cy.findByText('Collection Tracker').should('be.visible')
		// AND types in idenfier only
		cy.findByPlaceholderText('Email / Username').type('hafidz')
		cy.findByPlaceholderText('Password').should('be.visible')
		// THEN button should be disabled
		cy.findByRole('button', {name: 'Login'}).should('be.disabled')
	})

	it('should disable button given empty identifier', () => {
		// WHEN user visits /login
		cy.visit('/login')
		cy.findByText('Collection Tracker').should('be.visible')
		// AND types in password only
		cy.findByPlaceholderText('Email / Username').should('be.visible')
		cy.findByPlaceholderText('Password').type('Hafidz123!')
		// THEN button should be disabled
		cy.findByRole('button', {name: 'Login'}).should('be.disabled')
	})

	it('should login successfully given valid user credentials', () => {
		// WHEN user visits /login
		cy.visit('/login')
		cy.findByText('Collection Tracker').should('be.visible')
		// AND types in valid credentials to login
		cy.findByPlaceholderText('Email / Username').type('hafidz')
		cy.findByPlaceholderText('Password').type('Hafidz123!')
		cy.findByRole('button', {name: 'Login'}).click()
		// THEN user should be redirected to homepage
		cy.findByText('Hello World')
	})

	it('should show error message given invalid user credentials', () => {
		// WHEN user visits /login
		cy.visit('/login')
		cy.findByText('Collection Tracker').should('be.visible')
		// AND types in invalid credentials to login
		cy.findByPlaceholderText('Email / Username').type('hafidz')
		cy.findByPlaceholderText('Password').type('Hafidz456!')
		cy.findByRole('button', {name: 'Login'}).click()
		// THEN user should be shown appropriate error message
		cy.findByText('Invalid Credentials')
	})
})
