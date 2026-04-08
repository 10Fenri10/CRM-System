import React, { useEffect, useState } from 'react'
import { getProfile } from '../api/profileApi'
import { useAuth } from '../hooks'
import { Profile } from '../types/auth'

export const MyProfile: React.FC = () => {
	const { isLogged } = useAuth()
	const [profileData, setProfileData] = useState<Profile | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!isLogged) return

		setIsLoading(true)
		setError(null)

		getProfile()
			.then(result => {
				setProfileData(result)
			})
			.catch(e => {
				setError(
					e instanceof Error ? e.message : 'Не удалось загрузить профиль',
				)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [isLogged])

	return (
		<div>
			<h2>Профиль</h2>
			{!isLogged && <p>Пользователь не авторизован</p>}
			{isLogged && isLoading && <p>Загрузка...</p>}
			{isLogged && error && <p>Ошибка: {error}</p>}
			{isLogged && profileData && (
				<div>
					<p style={{ marginBottom: 8 }}>Имя: {profileData.username}</p>
					<p style={{ marginBottom: 8 }}>Email: {profileData.email}</p>
					<p style={{ marginBottom: 8 }}>
						Телефон: {profileData.phoneNumber || 'Телефон не был указан'}
					</p>
				</div>
			)}
		</div>
	)
}
