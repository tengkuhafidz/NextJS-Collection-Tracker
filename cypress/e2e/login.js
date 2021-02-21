describe('login', () => {
	it('should login successfully given valid user credentials', () => {
		cy.visit('/login')
		cy.findByText('Collection Tracker').should('be.visible')
		cy.findByPlaceholderText('Email / Username').type('hafidz')
		cy.findByPlaceholderText('Password').type('Hafidz123!')
		cy.findByRole('button', {name: 'Login'}).click()
	})
})
