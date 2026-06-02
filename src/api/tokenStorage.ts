const REFRESH_TOKEN_KEY = 'crm_refresh_token'

export function getRefreshToken(): string | null {
	return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setTokens(refreshToken: string): void {
	localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export function clearTokens(): void {
	localStorage.removeItem(REFRESH_TOKEN_KEY)
}
