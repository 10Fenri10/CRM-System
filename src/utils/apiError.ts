import axios from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data as unknown
		if (typeof data === 'string' && data.trim()) return data
		if (data && typeof data === 'object') {
			const o = data as Record<string, unknown>
			if (typeof o.message === 'string' && o.message.trim()) return o.message
			if (typeof o.error === 'string' && o.error.trim()) return o.error
		}
	}
	if (error instanceof Error && error.message) return error.message
	return fallback
}
