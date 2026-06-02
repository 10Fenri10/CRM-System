const AUTH_LOGOUT_EVENT = 'auth:logout'

export function emitAuthLogoutEvent(): void {
	window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT))
}

export function subscribeAuthLogout(handler: () => void): () => void {
	window.addEventListener(AUTH_LOGOUT_EVENT, handler)
	return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handler)
}
