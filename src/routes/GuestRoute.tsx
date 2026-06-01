import React, { PropsWithChildren } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks'

export const GuestRoute: React.FC<PropsWithChildren> = ({ children }) => {
	const { isAuthorized, status } = useAuth()

	if (status === 'checking') {
		return <div style={{ textAlign: 'center', padding: 48 }}>Загрузка...</div>
	}

	if (isAuthorized) {
		return <Navigate to='/' replace />
	}

	return children
}
