describe('Capture Collection', () => {
	it('should disable the next button when user does not provide any ID', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user does not provide ID
		cy.findByPlaceholderText('ID').should('be.visible')
		// THEN next button should be disabled
		cy.findByRole('button', {name: 'Next'}).should('be.disabled')
	})

	it('should display invalid ID error message when user provides invalid customer ID', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides invalid customer ID
		cy.captureCustomerId('99')
		// THEN user should see invalid ID error message
		cy.findByText('Invalid ID')
	})

	it('should be able to identify the customer given valid ID and his collection count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer ID
		cy.captureCustomerId('001')
		// THEN user should be redirected to collection tracker form
		cy.url().should('include', '/form')
		// AND able to identify the customer
		cy.findByText('hirman')
		// AND see his total collection count against the maximum for the day
		cy.findByText('Collections Today: 0 / 3')
	})

	it('should allow user to go back after the user has gone to the form page', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer ID
		cy.captureCustomerId('001')
		// THEN user should be redirected to collection tracker form
		cy.url().should('include', '/form')
		// WHEN user goes back
		cy.findByText('back').click()
		// THEN the user should go back to the homepage see his total collection count against the maximum for the day
		cy.findByText('Capture ID')
	})

	it('should be able to record collection given valid ID and customer has not collected more than the maximum count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user successfully record collection
		cy.recordCollection('001', 0)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')

		// WHEN user goes back to home
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// AND user successfully record collection
		cy.recordCollection('001', 1)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')

		// WHEN user goes back to home
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// AND user successfully record collection
		cy.recordCollection('001', 2)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')
	})

	it('should not allow users to record collection when customer has collected equals or more than the maximum count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer ID
		cy.captureCustomerId('001')
		// THEN user should see Maximum Collection error message
		cy.findByText('Collections Today: 3 / 3')
		cy.findByText('Maximum Collection Reached')
		// WHEN user clicks on Back To Home button
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// THEN user will be redirected to homepage
		cy.findByText('Capture ID')
	})
})
