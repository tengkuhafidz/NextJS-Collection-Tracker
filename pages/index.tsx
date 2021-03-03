import Router from 'next/router'
import {destroyCookie, parseCookies} from 'nookies'
import React, {useState} from 'react'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'
import mixpanel from 'mixpanel-browser'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

import dynamic from 'next/dynamic'
const ClientQrScanner = dynamic(() => import('../components/qr-scanner'), {
	ssr: false,
})

export default function Home() {
	mixpanel.init(publicRuntimeConfig.MixpanelToken)

	const [customerId, setCustomerId] = useState(null)
	const [isValidCustomerId, setIsValidCustomerId] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [isScannerActive, setIsScannerActive] = useState(false)
	const {username} = parseCookies()

	const handleLogout = () => {
		mixpanel.track('logout', {username})
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
			mixpanel.track('capture_customer_error', {customerId})
			console.log('ERROR getCustomer for customer ID: ', customerId, e)
		}

		if (!customer) {
			setIsValidCustomerId(false)
			mixpanel.track('capture_customer_invalid', {customerId})
			setIsLoading(false)
		} else {
			mixpanel.track('capture_customer_success', {customerId})
			Router.push({pathname: '/form', query: {customerId}})
		}
	}

	const handleScan = data => {
		if (data) {
			setCustomerId(data)
			mixpanel.track('scan_success', {data})
			setIsScannerActive(false)
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
		mixpanel.track('scan_start')
		return <ClientQrScanner handleScan={handleScan} />
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
					<h1
						className={`text-3xl font-bold text-center mb-8 ${
							isScannerActive ? 'mt-8' : 'mt-32'
						}`}
					>
						Capture ID
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
