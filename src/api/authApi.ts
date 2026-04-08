import api from './http'
import { clearTokens, getRefreshToken, setTokens } from './tokenStorage'

import { AuthData, RefreshToken, Token, UserRegistration } from '../types/auth'

export async function login(data: AuthData): Promise<Token> {
	const response = await api.post('/auth/signin', data)
	setTokens(response.data.accessToken, response.data.refreshToken)
	return response.data
}

export async function registration(data: UserRegistration): Promise<Token> {
	const response = await api.post('/auth/signup', data)
	return response.data
}

export async function refreshTokens(payload?: RefreshToken): Promise<Token> {
	const refreshToken = payload?.refreshToken ?? getRefreshToken()
	if (!refreshToken) {
		throw new Error('Refresh token is missing')
	}

	const response = await api.post('/auth/refresh', { refreshToken })
	setTokens(response.data.accessToken, response.data.refreshToken)
	return response.data
}

export async function restoreSession(): Promise<Token> {
	return refreshTokens()
}

export async function logout(): Promise<void> {
	try {
		await api.post('/user/logout')
	} finally {
		clearTokens()
	}
}

export function forceLogout(): void {
	clearTokens()
}
