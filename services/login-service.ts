import {LoginRequest} from '../typings'
import {apiCall} from '../utils/api-call'

export const loginService = async (loginRequest: LoginRequest) => {
	const {data} = await apiCall.post('/auth/local', loginRequest)
	return data
}
