import axios from 'axios'
import getConfig from 'next/config'
import {parseCookies} from 'nookies'
import {LoginRequest, RecordCollectionRequest} from '../typings'

const {publicRuntimeConfig} = getConfig()

const apiCall = axios.create({
	baseURL: publicRuntimeConfig.StrapiBaseUrl,
})

export const login = async (loginRequest: LoginRequest) => {
	const {data} = await apiCall.post('/auth/local', loginRequest)
	return data
}

export const getBeneficiary = async (nric: string) => {
	const {data} = await apiCall.get(
		`/beneficiaries?nric=${nric}&_limit=1`,
		getApiConfig(),
	)

	return data[0]
}

export const getBeneficiaryCollectionCountToday = async (nric: string) => {
	const {data} = await apiCall.get(
		`/collections/count?beneficiary.nric=${nric}&created_at_gte=${dateToday()}`,
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
	beneficiaryId: string,
	imageId: string,
) => {
	await apiCall.put(
		`/beneficiaries/${beneficiaryId}`,
		{photo: imageId},
		getApiConfig(),
	)
}

export const recordCollection = async (
	beneficiaryId: string,
	quantity: number,
) => {
	const {userId} = parseCookies()
	const requestBody: RecordCollectionRequest = {
		beneficiary: beneficiaryId,
		units: quantity,
		users_permissions_user: userId,
		lokasi: 'Johore Baharu',
	}

	await apiCall.post('/collections', requestBody, getApiConfig())
}

export const dateToday = () => {
	const dt = new Date()
	return dt.getFullYear() + '-0' + (dt.getMonth() + 1) + '-' + dt.getDate()
}

const getApiConfig = () => {
	const {token} = parseCookies()
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
}
