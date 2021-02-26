import Link from 'next/link'
import Router from 'next/router'
import React, {useEffect, useState} from 'react'
import Camera from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import {ErrorBox} from '../components/error-box'
import Layout from '../components/layout'
import * as StrapiService from '../services/strapi-services'

export default function Form() {
	const nric = Router.query.nric as string
	const [beneficiary, setBeneficiary] = useState(null)
	const [collectionCountToday, setCollectionCountToday] = useState(0)
	const [maxCollectionCountToday, setMaxCollectionCountToday] = useState(0)
	const [quantity, setQuantity] = useState(1)
	const [isCameraActive, setIsCameraActive] = useState(false)
	const [photo, setPhoto] = useState('/photo.png')

	useEffect(() => {
		async function fetchAndSetData() {
			const beneficiary = await StrapiService.getBeneficiary(nric)
			const collectionCount = await StrapiService.getBeneficiaryCollectionCountToday(
				nric,
			)
			const maxCollectionCount = await StrapiService.getMaxCollectionCount()

			const beneficiaryImageUrl = beneficiary.photo?.formats?.thumbnail?.url
			if (beneficiaryImageUrl) {
				setPhoto(beneficiaryImageUrl)
			}

			setBeneficiary(beneficiary)
			setCollectionCountToday(collectionCount)
			setMaxCollectionCountToday(maxCollectionCount)
		}
		fetchAndSetData()
	}, [])

	if (!maxCollectionCountToday) {
		return null
	}

	const {id, nama} = beneficiary

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
		await StrapiService.recordCollection(id, quantity)
		Router.push('/success')
	}

	const handleTakePhoto = async base64Image => {
		const imageFile = await fetch(base64Image).then(res => res.blob())
		const imageData = await StrapiService.uploadImage(imageFile, nama)
		await StrapiService.updateProfileImage(id, imageData.id)

		setPhoto(imageData.url)
		setIsCameraActive(false)
	}

	const renderProfileImage = () => {
		if (isCameraActive) {
			return (
				<div>
					<Camera
						onTakePhoto={async dataUri => await handleTakePhoto(dataUri)}
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
				alt="Beneficiary Photo"
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
				className="mt-8 p-3 w-full bg-black text-white rounded-md text-xl"
				onClick={handleSubmit}
			>
				Submit
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
					<h1 className="mt-4 text-xl font-semibold">{nama}</h1>
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
