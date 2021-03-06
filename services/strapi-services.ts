import axios from 'axios'
import {parseCookies} from 'nookies'
import {LoginRequest, RecordCollectionRequest} from '../typings'
import getConfig from 'next/config'
import moment from 'moment'

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

export const getAllCustomers = async () => {
	const {data} = await apiCall.get(`/customers`, getApiConfig())

	return data
}

export const getCustomerCollectionCountToday = async (customerId: string) => {
	const todayDate = moment().format('YYYY-MM-DD')
	const {data} = await apiCall.get(
		`/collections/count?customer.id=${customerId}&created_at_gte=${todayDate}`,
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

const getApiConfig = () => {
	const {token} = parseCookies()
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
}
