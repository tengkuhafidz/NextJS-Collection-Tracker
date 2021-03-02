import Router from 'next/router'
import {destroyCookie, parseCookies} from 'nookies'
import React, {useState} from 'react'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'
import QrReader from 'react-qr-scanner'

export default function Home() {
	const [customerId, setCustomerId] = useState(null)
	const [isValidCustomerId, setIsValidCustomerId] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [isScannerActive, setIsScannerActive] = useState(false)
	const {username} = parseCookies()

	const handleLogout = () => {
		destroyCookie(null, 'token')
		destroyCookie(null, 'username')
		Router.push('/login')
	}

	const handleCustomerIdChange = (customerId: string) => {
		setCustomerId(customerId)
		setIsValidCustomerId(true)
	}

	const handleCaptureCustomerId = async () => {
		setIsLoading(true)
		let customer

		try {
			customer = await StrapiService.getCustomer(customerId)
		} catch (e) {
			console.log('ERROR getCustomer for customer ID: ', customerId, e)
		}

		if (!customer) {
			setIsValidCustomerId(false)
			setIsLoading(false)
		} else {
			Router.push({pathname: '/form', query: {customerId}})
		}
	}

	const renderInvalidCustomerIdError = () => {
		if (!isValidCustomerId && !!customerId) {
			return <ErrorBox message="Invalid ID" />
		}

		return null
	}

	const renderQrScanner = () => {
		if (!isScannerActive) {
			return null
		}
		return (
			<QrReader
				delay={300}
				onScan={data => setCustomerId(data)}
				onError={e => console.log(e)}
				facingMode="rear"
			/>
		)
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
						Capture ID {customerId}
					</h1>
					{renderQrScanner()}
					<div className="flex">
						<input
							type="text"
							placeholder="ID"
							className="standard-input flex-grow m-0"
							value={customerId}
							onChange={e => handleCustomerIdChange(e.target.value)}
						/>
						<button
							className="ml-1 px-2 bg-gray-800 text-white rounded-md w-12"
							onClick={() => setIsScannerActive(!isScannerActive)}
						>
							{isScannerActive ? 'x' : 'scan'}
						</button>
					</div>
					{renderInvalidCustomerIdError()}
					<button
						className={`text-xl bg-black rounded-md text-white w-full p-3 mt-8 disabled:opacity-60 disabled:cursor-not-allowed ${
							isLoading && 'opacity-60 cursor-not-allowed'
						}`}
						disabled={!customerId || isLoading}
						onClick={handleCaptureCustomerId}
					>
						{isLoading ? 'Loading...' : 'Next'}
					</button>
				</main>
			</div>
		</Layout>
	)
}
