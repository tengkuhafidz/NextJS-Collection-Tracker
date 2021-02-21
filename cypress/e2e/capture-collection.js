describe('Capture Collection', () => {
	it('should disable the next button when user does not provide any nric', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user does not provide NRIC
		cy.findByPlaceholderText('NRIC').should('be.visible')
		// THEN next button should be disabled
		cy.findByRole('button', {name: 'Next'}).should('be.disabled')
	})

	it('should display invalid nric error message when user provides invalid beneficiary nric', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides invalid beneficiary nric
		cy.findByPlaceholderText('NRIC').type('S7654321D')
		cy.findByRole('button', {name: 'Next'}).click()
		// THEN user should see invalid nric error message
		cy.findByText('Invalid NRIC')
	})

	it('should identify the beneficiary given valid nric', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid beneficiary nric
		cy.findByPlaceholderText('NRIC').type('S1111111D')
		cy.findByRole('button', {name: 'Next'}).click()
		// THEN user should be redirected to collection tracker form
		cy.url().should('include', '/form')
		// AND able to identify the beneficiary
		cy.findByText('hashim')
	})
})
