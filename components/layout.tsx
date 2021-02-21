import Head from 'next/head'
import React from 'react'

const Layout = ({children}): JSX.Element => (
	<div>
		<Head>
			<title>Collection Tracker | Food Distribution</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<div>{children}</div>
	</div>
)

export default Layout
