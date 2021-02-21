import axios from 'axios'
import getConfig from 'next/config'
import {parseCookies} from 'nookies'
import {LoginRequest} from '../typings'

const {publicRuntimeConfig} = getConfig()

const apiCall = axios.create({
	baseURL: publicRuntimeConfig.StrapiBaseUrl,
})

export const login = async (loginRequest: LoginRequest) => {
	const {data} = await apiCall.post('/auth/local', loginRequest)
	return data
}

export const getBeneficiary = async (nric: string) => {
	const {token} = parseCookies()
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}

	const {data} = await apiCall.get(
		`/beneficiaries?nric=${nric}&_limit=1`,
		config,
	)
	return data[0]
}
