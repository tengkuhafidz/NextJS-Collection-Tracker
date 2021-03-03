import Router from 'next/router'
import Image from 'next/image'
import {setCookie} from 'nookies'
import React, {useState} from 'react'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'
import mixpanel from 'mixpanel-browser'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

export default function Home() {
	mixpanel.init(publicRuntimeConfig.MixpanelToken)

	const [identifier, setIdentifier] = useState(null)
	const [password, setPassword] = useState(null)
	const [isValidCreds, setIsValidCreds] = useState(true)
	const [isLoading, setIsLoading] = useState(false)

	const handleChangeIdentifier = (identifier: string) => {
		setIdentifier(identifier)
		setIsValidCreds(true)
	}

	const handleChangePassword = (password: string) => {
		setPassword(password)
		setIsValidCreds(true)
	}

	const handleLogin = async () => {
		setIsLoading(true)
		try {
			await loginUser()
			mixpanel.track('login_success', {identifier})
		} catch (e) {
			mixpanel.track('login_failed', {identifier})
			setIsValidCreds(false)
		}
		setIsLoading(false)
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

	const renderLoginButton = () => {
		if (isLoading) {
			return (
				<button
					className="text-xl bg-black rounded-md text-white w-full p-3 mt-8 opacity-60 cursor-not-allowed"
					disabled
				>
					Loading...
				</button>
			)
		}
		return (
			<button
				onClick={handleLogin}
				className={`text-xl bg-black rounded-md text-white w-full p-3 mt-8 disabled:opacity-60 disabled:cursor-not-allowed ${
					isLoading && 'opacity-60 cursor-not-allowed'
				}`}
				disabled={!identifier || !password || isLoading}
			>
				{isLoading ? 'Loading...' : 'Login'}
			</button>
		)
	}

	return (
		<Layout>
			<main className="p-5">
				<div className="flex justify-center mt-4">
					<Image
						src="/nafas-logo.png"
						height={110}
						width={100}
						alt="Nafas Logo"
						className="mx-auto"
					/>
				</div>
				<h1 className="text-3xl font-bold text-center mt-12 mb-8">
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
				{renderLoginButton()}
			</main>
		</Layout>
	)
}
