import Link from 'next/link'
import Router from 'next/router'
import React, {useEffect, useState} from 'react'
import Camera, {FACING_MODES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'
import BounceLoader from 'react-spinners/BounceLoader'

export default function Form() {
	const customerId = Router.query.customerId as string
	const [customer, setCustomer] = useState(null)
	const [collectionCountToday, setCollectionCountToday] = useState(0)
	const [maxCollectionCountToday, setMaxCollectionCountToday] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [isCameraActive, setIsCameraActive] = useState(false)
	const [photo, setPhoto] = useState('/photo.png')
	const [isLoadingImage, setIsLoadingImage] = useState(false)
	const [isLoadingSubmission, setIsLoadingSubmission] = useState(false)

	useEffect(() => {
		async function fetchAndSetData() {
			const customer = await StrapiService.getCustomer(customerId)
			const collectionCount = await StrapiService.getCustomerCollectionCountToday(
				customerId,
			)
			const maxCollectionCount = await StrapiService.getMaxCollectionCount()

			const customerPhotoUrl = customer.photo?.formats?.thumbnail?.url
			if (customerPhotoUrl) {
				setPhoto(customerPhotoUrl)
			}

			setCustomer(customer)
			setCollectionCountToday(collectionCount)
			setMaxCollectionCountToday(maxCollectionCount)
		}
		fetchAndSetData()
	}, [])

	if (!maxCollectionCountToday) {
		return null
	}

	const {id, name} = customer

	const handleQuantityIncrement = () => {
		setQuantity(quantity + 1)
	}

	const handleQuantityDecrement = () => {
		if (quantity <= 1) {
			setQuantity(1)
		} else {
			setQuantity(quantity - 1)
		}
	}

	const handleBack = async e => {
		e.preventDefault()
		Router.back()
	}

	const handleSubmit = async () => {
		setIsLoadingSubmission(true)
		try {
			await StrapiService.recordCollection(id, quantity)
			Router.push('/success')
		} catch (e) {
			console.log('ERROR recordCollection for', id, e)
			setIsLoadingSubmission(false)
		}
	}

	const handleTakePhoto = async base64Image => {
		setIsLoadingImage(true)
		const imageFile = await fetch(base64Image).then(res => res.blob())
		const imageData = await StrapiService.uploadImage(imageFile, name)
		await StrapiService.updateProfileImage(id, imageData.id)

		setPhoto(imageData.url)
		setIsLoadingImage(false)
		setIsCameraActive(false)
	}

	const renderProfileImage = () => {
		if (isLoadingImage) {
			return (
				<div className="-ml-12 pl-0 h-24">
					<BounceLoader color="#333333" size={60} />
				</div>
			)
		}

		if (isCameraActive) {
			return (
				<div>
					<Camera
						onTakePhoto={async dataUri => await handleTakePhoto(dataUri)}
						idealFacingMode={FACING_MODES.ENVIRONMENT}
						isImageMirror={false}
					/>
					<p className="text-gray-600" onClick={() => setIsCameraActive(false)}>
						[ close x ]
					</p>
				</div>
			)
		}

		return (
			<img
				src={photo}
				alt="Customer Photo"
				onClick={() => setIsCameraActive(true)}
				className="h-64 rounded-md mx-auto"
			/>
		)
	}

	const renderQuantitySectionOrErrorBox = () => {
		if (collectionCountToday >= maxCollectionCountToday) {
			return <ErrorBox message="Maximum Collection Reached" />
		} else {
			return (
				<div className="mx-auto text-center mb-8">
					<p className="font-light mb-2">Units Collected:</p>
					<button
						onClick={handleQuantityDecrement}
						className="mr-4 bg-gray-600 text-white px-2 pb-1 rounded-md"
					>
						-
					</button>
					<span className="font-semibold text-2xl">{quantity}</span>
					<button
						onClick={handleQuantityIncrement}
						className="ml-4 bg-gray-600 text-white px-2 pb-1 rounded-md"
					>
						+
					</button>
				</div>
			)
		}
	}

	const renderMainButton = () => {
		if (collectionCountToday >= maxCollectionCountToday) {
			return (
				<Link href="/">
					<button className="mt-8 p-3 w-full bg-black text-white rounded-md text-xl">
						Back To Home
					</button>
				</Link>
			)
		}

		return (
			<button
				className={`mt-8 p-3 w-full bg-black text-white rounded-md text-xl ${
					isLoadingSubmission && 'opacity-60 cursor-not-allowed'
				}`}
				disabled={isLoadingSubmission}
				onClick={handleSubmit}
			>
				{isLoadingSubmission ? 'Loading...' : 'Submit'}
			</button>
		)
	}

	return (
		<Layout>
			<div className="flex">
				<p className="p-2 text-gray-500" onClick={handleBack}>
					back
				</p>
			</div>
			<main className="mt-16 p-8">
				<div className="text-center">
					{renderProfileImage()}
					<h1 className="mt-4 text-xl font-semibold">{name}</h1>
					<p>
						Collections Today: {collectionCountToday} /{' '}
						{maxCollectionCountToday}
					</p>
				</div>

				<div className="mt-8 my-8">
					{renderQuantitySectionOrErrorBox()}
					<div>{renderMainButton()}</div>
				</div>
			</main>
		</Layout>
	)
}
