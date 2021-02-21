import Router from 'next/router'
import { setCookie } from 'nookies'
import React, { useState } from 'react'
import { ErrorBox } from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'

export default function Home() {
	const [identifier, setIdentifier] = useState(null)
	const [password, setPassword] = useState(null)
	const [isValidCreds, setIsValidCreds] = useState(true)

	const handleChangeIdentifier = (identifier: string) => {
		setIdentifier(identifier)
		setIsValidCreds(true)
	}

	const handleChangePassword = (password: string) => {
		setPassword(password)
		setIsValidCreds(true)
	}

	const handleLogin = async () => {
		try {
			await loginUser()
		} catch (e) {
			setIsValidCreds(false)
		}
	}

	const loginUser = async () => {
		setIsValidCreds(true)
		const userData = await StrapiService.login({identifier, password})
		setCookies(userData)
		Router.push('/')
	}

	const setCookies = userData => {
		const {
			jwt,
			user: {id, username},
		} = userData

		setCookie(null, 'token', jwt)
		setCookie(null, 'username', username)
		setCookie(null, 'userId', id)
	}

	const renderInvalidCredsError = () => {
		if (!isValidCreds && !!identifier && !!password) {
			return <ErrorBox message="Invalid Credentials" />
		}

		return null
	}

	return (
		<Layout>
			<main className="p-5">
				<h1 className="text-3xl font-bold text-center mt-32 mb-16">
					Collection Tracker
				</h1>
				<input
					type="text"
					placeholder="Email / Username"
					className="standard-input"
					onChange={e => handleChangeIdentifier(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					className="standard-input"
					onChange={e => handleChangePassword(e.target.value)}
				/>
				{renderInvalidCredsError()}
				<button
					onClick={handleLogin}
					className="text-xl bg-black rounded-md text-white w-full p-3 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
					disabled={!identifier || !password}
				>
					Login
				</button>
			</main>
		</Layout>
	)
}
