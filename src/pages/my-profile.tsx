import React from 'react'
import { useAuth } from '../hooks'

export const MyProfile: React.FC = () => {
	const { user } = useAuth()

	return (
		<div>
			<h2 style={{ marginTop: 0 }}>Профиль</h2>
			<p style={{ marginBottom: 0 }}>
				{user ? `Здравствуйте, ${user.name} (${user.email})` : 'Пользователь не найден'}
			</p>
		</div>
	)
}
