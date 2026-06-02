import { tokenManager } from './accessToken'
import api from './http'
import { clearTokens, getRefreshToken, setTokens } from './tokenStorage'

import { AuthData, RefreshToken, Token, UserRegistration } from '../types/auth'

export async function login(data: AuthData): Promise<Token> {
	const response = await api.post('/auth/signin', data)
	tokenManager.set(response.data.accessToken)
	setTokens(response.data.refreshToken)
	return response.data
}

export async function singUp(data: UserRegistration): Promise<Token> {
	const response = await api.post('/auth/signup', data)
	return response.data
}

export async function refreshTokens(payload?: RefreshToken): Promise<Token> {
	const refreshToken = payload?.refreshToken ?? getRefreshToken()
	if (!refreshToken) {
		throw new Error('Refresh token is missing')
	}

	const response = await api.post('/auth/refresh', { refreshToken })
	tokenManager.set(response.data.accessToken)
	setTokens(response.data.refreshToken)
	return response.data
}

export async function logout(): Promise<void> {
	try {
		await api.post('/user/logout')
	} finally {
		tokenManager.set(null)
		clearTokens()
	}
}

export function forceLogout(): void {
	tokenManager.set(null)
	clearTokens()
}
