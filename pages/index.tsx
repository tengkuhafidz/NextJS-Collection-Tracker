import Router from 'next/router'
import {destroyCookie, parseCookies} from 'nookies'
import React, {useState} from 'react'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'

export default function Home() {
	const [nric, setNric] = useState(null)
	const [isValidNric, setIsValidNric] = useState(true)
	const {username} = parseCookies()

	const handleLogout = () => {
		destroyCookie(null, 'token')
		destroyCookie(null, 'username')
		Router.push('/login')
	}

	const handleNricChange = (nric: string) => {
		setNric(nric)
		setIsValidNric(true)
	}

	const handleCaptureNric = async () => {
		const beneficiary = await StrapiService.getBeneficiary(nric)

		if (!beneficiary) {
			setIsValidNric(false)
		} else {
			Router.push({pathname: '/form', query: {nric: nric}})
		}
	}

	const renderInvalidNricError = () => {
		if (!isValidNric && !!nric) {
			return <ErrorBox message="Invalid NRIC" />
		}

		return null
	}

	return (
		<Layout>
			<div>
				<div className="flex">
					<p className="p-2 text-gray-500 inline flex-grow">{username}</p>
					<p className="p-2 text-gray-500 inline" onClick={handleLogout}>
						logout
					</p>
				</div>

				<main className="p-5">
					<h1 className="text-3xl font-bold text-center mt-32 mb-8">
						Capture NRIC
					</h1>
					<input
						type="text"
						placeholder="NRIC"
						className="standard-input"
						onChange={e => handleNricChange(e.target.value)}
					/>
					{renderInvalidNricError()}
					<button
						className="text-xl bg-black rounded-md text-white w-full p-3 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
						disabled={!nric}
						onClick={handleCaptureNric}
					>
						Next
					</button>
				</main>
			</div>
		</Layout>
	)
}
