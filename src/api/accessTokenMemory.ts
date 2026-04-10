let accessToken: string | null = null

export function getAccessTokenMemory(): string | null {
	return accessToken
}

export function setAccessTokenMemory(token: string | null): void {
	accessToken = token
}
