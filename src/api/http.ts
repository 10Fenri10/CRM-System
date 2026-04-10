import axios, { InternalAxiosRequestConfig } from 'axios'
import { emitAuthLogoutEvent } from './authEvents'
import { forceLogout, refreshTokens } from './authApi'
import { getAccessTokenMemory, setAccessTokenMemory } from './accessTokenMemory'

const api = axios.create({
	baseURL: 'https://easydev.club/api/v1',
})

api.interceptors.request.use(config => {
	const token = getAccessTokenMemory()
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

type RetryableRequestConfig = InternalAxiosRequestConfig & {
	_retry?: boolean
}

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config as RetryableRequestConfig | undefined
		const status = error?.response?.status as number | undefined
		const isRefreshCall = (originalRequest?.url ?? '').includes('/auth/refresh')

		if (status !== 401 || !originalRequest || originalRequest._retry || isRefreshCall) {
			return Promise.reject(error)
		}

		originalRequest._retry = true

		try {
			const tokens = await refreshTokens()
			setAccessTokenMemory(tokens.accessToken)
			originalRequest.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
			return api(originalRequest)
		} catch (refreshError) {
			forceLogout()
			emitAuthLogoutEvent()
			return Promise.reject(refreshError)
		}
	},
)

export default api
