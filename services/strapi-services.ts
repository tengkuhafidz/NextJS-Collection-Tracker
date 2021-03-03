import axios from 'axios'
import {parseCookies} from 'nookies'
import {LoginRequest, RecordCollectionRequest} from '../typings'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

const apiCall = axios.create({
	baseURL: publicRuntimeConfig.StrapiBaseUrl,
})

export const login = async (loginRequest: LoginRequest) => {
	const {data} = await apiCall.post('/auth/local', loginRequest)
	return data
}

export const getCustomer = async (customerId: string) => {
	const {data} = await apiCall.get(
		`/customers?id=${customerId}&_limit=1`,
		getApiConfig(),
	)

	return data[0]
}

export const getCustomerCollectionCountToday = async (customerId: string) => {
	const {data} = await apiCall.get(
		`/collections/count?customer.id=${customerId}&created_at_gte=${dateToday()}`,
		getApiConfig(),
	)
	return data
}

export const getMaxCollectionCount = async () => {
	const {data} = await apiCall.get(`/collection-count-today`, getApiConfig())
	return data.maxCount
}

export const uploadImage = async (imageFile, imageName) => {
	const formData = new FormData()
	formData.append('files', imageFile, imageName)

	const {token} = parseCookies()

	const {data} = await apiCall.post('/upload', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
			Authorization: `Bearer ${token}`,
		},
	})

	return data[0]
}

export const updateProfileImage = async (
	customerId: string,
	imageId: string,
) => {
	await apiCall.put(
		`/customers/${customerId}`,
		{photo: imageId},
		getApiConfig(),
	)
}

export const recordCollection = async (
	customerId: string,
	quantity: number,
) => {
	const {userId} = parseCookies()
	const requestBody: RecordCollectionRequest = {
		customer: customerId,
		units: quantity,
		users_permissions_user: userId,
		lokasi: 'Johore Baharu',
	}

	await apiCall.post('/collections', requestBody, getApiConfig())
}

export const dateToday = () => {
	const dt = new Date()

	// doing this computational gymnastics to achieve this format: 2021-01-01
	return (
		dt.getFullYear() +
		'-' +
		('0' + (dt.getMonth() + 1)).slice(-2) +
		'-' +
		('0' + dt.getDate()).slice(-2)
	)
}

const getApiConfig = () => {
	const {token} = parseCookies()
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
}
