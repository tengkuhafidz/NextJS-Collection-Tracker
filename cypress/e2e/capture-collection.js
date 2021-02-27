describe('Capture Collection', () => {
	it('should disable the next button when user does not provide any official id', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user does not provide Official ID
		cy.findByPlaceholderText('Official ID').should('be.visible')
		// THEN next button should be disabled
		cy.findByRole('button', {name: 'Next'}).should('be.disabled')
	})

	it('should display invalid official id error message when user provides invalid customer official id', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides invalid customer official id
		cy.captureOfficialId('S7654321D')
		// THEN user should see invalid official id error message
		cy.findByText('Invalid Official ID')
	})

	it('should be able to identify the customer given valid official id and his collection count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer official id
		cy.captureOfficialId('S1111111D')
		// THEN user should be redirected to collection tracker form
		cy.url().should('include', '/form')
		// AND able to identify the customer
		cy.findByText('hashim')
		// AND see his total collection count against the maximum for the day
		cy.findByText('Collections Today: 0 / 3')
	})

	it('should allow user to go back after the user has gone to the form page', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer official id
		cy.captureOfficialId('S1111111D')
		// THEN user should be redirected to collection tracker form
		cy.url().should('include', '/form')
		// WHEN user goes back
		cy.findByText('back').click()
		// THEN the user should go back to the homepage see his total collection count against the maximum for the day
		cy.findByText('Capture Official ID')
	})

	it('should be able to record collection given valid official id and customer has not collected more than the maximum count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user successfully record collection
		cy.recordCollection('S1111111D', 0)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')

		// WHEN user goes back to home
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// AND user successfully record collection
		cy.recordCollection('S1111111D', 1)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')

		// WHEN user goes back to home
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// AND user successfully record collection
		cy.recordCollection('S1111111D', 2)
		// THEN user will be redirected to a success page
		cy.findByText('Success!')
	})

	it('should not allow users to record collection when customer has collected equals or more than the maximum count for the day', () => {
		// GIVEN user is logged in
		cy.login('hafidz', 'Hafidz123!')
		// WHEN user provides valid customer official id
		cy.captureOfficialId('S1111111D')
		// THEN user should see Maximum Collection error message
		cy.findByText('Collections Today: 3 / 3')
		cy.findByText('Maximum Collection Reached')
		// WHEN user clicks on Back To Home button
		cy.findByRole('button', {name: 'Back To Home'}).click()
		// THEN user will be redirected to homepage
		cy.findByText('Capture Official ID')
	})
})
