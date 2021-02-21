import Head from 'next/head'
import {useState} from 'react'
import {loginService} from '../services/login-service'
import Router from 'next/router'
import {setCookie} from 'nookies'

export default function Home() {
	const [identifier, setIdentifier] = useState(null)
	const [password, setPassword] = useState(null)
	const [isInvalidCreds, setIsInvalidCreds] = useState(false)

	const handleChangeIdentifier = (identifier: string) => {
		setIdentifier(identifier)
		setIsInvalidCreds(false)
	}

	const handleChangePassword = (password: string) => {
		setPassword(password)
		setIsInvalidCreds(false)
	}

	const handleLogin = async () => {
		try {
			await loginUser()
		} catch (e) {
			setIsInvalidCreds(true)
		}
	}

	const loginUser = async () => {
		setIsInvalidCreds(false)
		const userData = await loginService({identifier, password})
		setCookies(userData)
		Router.push('/')
	}

	const setCookies = (userData) => {
		const {
			jwt,
			user: {id, username},
		} = userData

		setCookie(null, 'token', jwt)
		setCookie(null, 'username', username)
		setCookie(null, 'userId', id)
	}

	const renderInvalidCredsError = () => {
		if (!!identifier && !!password && isInvalidCreds) {
			return (
				<div className="bg-red-100 p-3 mt-4 text-center rounded-md">
					<p className="font-semibold text-red-800">Invalid Credentials</p>
				</div>
			)
		}

		return null
	}

	return (
		<div>
			<Head>
				<title>NextJS Boilerplate</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

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
		</div>
	)
}
