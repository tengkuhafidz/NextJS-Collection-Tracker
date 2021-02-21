describe('Authentication Redirects', () => {
	it('should redirect user to login page if not logged in', () => {
		// WHEN user goes to homepage
		cy.visit('/')
		// THEN I should be redirected to login page
		cy.findByText('Login')
	})

	it('should redirect user to homepage if user is logged in', () => {
		// GIVEN user is logged in
		cy.setCookie('token', 'MOCK-TOKEN')
		cy.setCookie('username', 'MOCK-USERNAME')
		// WHEN user goes to login page
		cy.visit('/login')
		// THEN I should be redirected to login page
		cy.findByText('Hello World')
	})
})
