export type AuthUser = {
	id: string
	email: string
	name: string
}

export type LoginCredentials = {
	email: string
	password: string
}

export type RegistrationFormValues = {
	login: string
	username: string
	password: string
	passwordConfirm: string
	email: string
	phoneNumber?: string
}

