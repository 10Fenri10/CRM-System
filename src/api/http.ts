import axios from 'axios'

const TOKEN_KEY = 'crm_auth_token'

const api = axios.create({
	baseURL: 'https://easydev.club/api/v1',
})

// Подставляем заголовок авторизации из localStorage (для будущего реального бэка).
api.interceptors.request.use(config => {
	const token = localStorage.getItem(TOKEN_KEY)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

export default api

