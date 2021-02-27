import Router from 'next/router'
import {destroyCookie, parseCookies} from 'nookies'
import React, {useState} from 'react'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'

export default function Home() {
	const [officialId, setOfficialId] = useState(null)
	const [isValidOfficialId, setIsValidOfficialId] = useState(true)
	const {username} = parseCookies()

	const handleLogout = () => {
		destroyCookie(null, 'token')
		destroyCookie(null, 'username')
		Router.push('/login')
	}

	const handleOfficialIdChange = (officialId: string) => {
		setOfficialId(officialId)
		setIsValidOfficialId(true)
	}

	const handleCaptureOfficialId = async () => {
		const customer = await StrapiService.getCustomer(officialId)

		if (!customer) {
			setIsValidOfficialId(false)
		} else {
			Router.push({pathname: '/form', query: {officialId}})
		}
	}

	const renderInvalidOfficialIdError = () => {
		if (!isValidOfficialId && !!officialId) {
			return <ErrorBox message="Invalid Official ID" />
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
						Capture Official ID
					</h1>
					<input
						type="text"
						placeholder="Official ID"
						className="standard-input"
						onChange={e => handleOfficialIdChange(e.target.value)}
					/>
					{renderInvalidOfficialIdError()}
					<button
						className="text-xl bg-black rounded-md text-white w-full p-3 mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
						disabled={!officialId}
						onClick={handleCaptureOfficialId}
					>
						Next
					</button>
				</main>
			</div>
		</Layout>
	)
}
