describe('Authentication Redirect', () => {
	it('should redirect user to login page if not logged in', () => {
		// WHEN user goes to homepage
		cy.visit('/')
		// THEN I should be redirected to login page
		cy.findByText('Login')
	})

	it('should redirect user to homepage if user is logged in', () => {
		// WHEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// THEN user should be redirected to homepage
		cy.findByText('Capture Official ID')
		// WHEN user goes to login page
		cy.visit('/login')
		// THEN user should be redirected to homepage again
		cy.findByText('Capture Official ID')
	})
})
