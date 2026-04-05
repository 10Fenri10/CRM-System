import type { AuthUser, LoginCredentials, RegistrationFormValues } from '../types/auth'

const TOKEN_KEY = 'crm_auth_token'
const USER_KEY = 'crm_auth_user'

function delay(ms: number) {
	return new Promise<void>(resolve => {
		setTimeout(() => resolve(), ms)
	})
}

function generateToken() {
	return `${Math.random().toString(36).slice(2)}.${Date.now().toString(36)}`
}

export type AuthResponse = {
	token: string
	user: AuthUser
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
	// Заглушка “бэка”: эмулируем задержку и выдаём токен.
	await delay(300)

	const email = credentials.email.trim().toLowerCase()
	const password = credentials.password

	if (!email || !email.includes('@')) {
		throw new Error('Введите корректный email')
	}
	if (!password || password.length < 2) {
		throw new Error('Неверный пароль')
	}

	const user: AuthUser = {
		id: `user_${btoa(email).slice(0, 12)}`,
		email,
		name: email.split('@')[0] ?? 'User',
	}

	const token = generateToken()
	localStorage.setItem(TOKEN_KEY, token)
	localStorage.setItem(USER_KEY, JSON.stringify(user))

	return { token, user }
}

export async function restoreSession(): Promise<AuthResponse> {
	// Заглушка: если токен + пользователь есть в localStorage — считаем сессию валидной.
	await delay(200)

	const token = localStorage.getItem(TOKEN_KEY)
	const userRaw = localStorage.getItem(USER_KEY)

	if (!token || !userRaw) {
		throw new Error('Session not found')
	}

	const user = JSON.parse(userRaw) as AuthUser
	return { token, user }
}

export async function getMe(): Promise<AuthUser> {
	await delay(100)

	const userRaw = localStorage.getItem(USER_KEY)
	if (!userRaw) throw new Error('Not authenticated')
	return JSON.parse(userRaw) as AuthUser
}

export async function logout(): Promise<void> {
	await delay(100)
	localStorage.removeItem(TOKEN_KEY)
	localStorage.removeItem(USER_KEY)
}

export async function signup(values: RegistrationFormValues): Promise<void> {
	await delay(400)

	const loginId = values.login.trim()
	const username = values.username.trim()
	const email = values.email.trim().toLowerCase()

	if (!loginId || loginId.length < 2) {
		throw new Error('Введите логин')
	}
	if (!username) {
		throw new Error('Введите имя пользователя')
	}
	if (!email || !email.includes('@')) {
		throw new Error('Введите корректный email')
	}
	if (values.password !== values.passwordConfirm) {
		throw new Error('Пароль и подтверждение должны совпадать')
	}
}

