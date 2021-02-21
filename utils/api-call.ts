import axios from 'axios'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()

const instance = axios.create({
	baseURL: publicRuntimeConfig.StrapiBaseUrl,
})

export const apiCall = instance
