// let accessToken: string | null = null

// export function getAccessToken(): string | null {
// 	return accessToken
// }

// export function setAccessToken(token: string | null): void {
// 	accessToken = token
// }

class TokenManager {
	#accessToken: string | null = null

	get(): string | null {
		return this.#accessToken
	}

	set(token: string | null): void {
		this.#accessToken = token
	}
}

export const tokenManager = new TokenManager()
