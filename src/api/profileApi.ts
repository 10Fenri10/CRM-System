import { Profile } from '../types/auth'
import api from './http'

export async function getProfile(): Promise<Profile> {
	const response = await api.get('/user/profile')
	return response.data
}
