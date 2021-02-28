describe('authentication', () => {
	it('should disable button given empty password', () => {
		// WHEN user goes to login page
		cy.visit('/login')
		// AND types in identifier only
		cy.findByPlaceholderText('Email / Username').type('hafidz')
		// THEN button should be disabled
		cy.findByRole('button', {name: 'Login'}).should('be.disabled')
	})

	it('should disable button given empty identifier', () => {
		// WHEN user goes to login page
		cy.visit('/login')
		// AND types in password only
		cy.findByPlaceholderText('Password').type('Hafidz123!')
		// THEN button should be disabled
		cy.findByRole('button', {name: 'Login'}).should('be.disabled')
	})

	it('should show error message given invalid user credentials', () => {
		// WHEN user tries to login with invalid password
		cy.login('hafidz', 'wrong-password')
		// THEN user should be shown appropriate error message
		cy.findByText('Invalid Credentials')
	})

	it('should login successfully and identify the user given valid user credentials', () => {
		// WHEN user logs in with valid credentials
		cy.login('hafidz', 'Hafidz123!')
		// THEN user should be redirected to homepage
		cy.findByText('Capture ID')
		// AND able to identify his username as the active user
		cy.findByText('hafidz')
	})

	it('should logout successfully given valid user logged in', () => {
		// WHEN user logs in with valid credentials
		cy.login('hafidz', 'Hafidz123!')
		// THEN user should be redirected to homepage
		cy.findByText(/logout/i).click()
		// AND able to identify his username as the active user
		cy.findByText(/login/i)
	})
})
