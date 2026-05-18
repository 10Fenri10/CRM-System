import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks'

type GuestRouteProps = {
	children: React.ReactElement
}

export const GuestRoute: React.FC<GuestRouteProps> = ({ children }) => {
	const { isAuthorized, status } = useAuth()

	if (status === 'checking') {
		return <div style={{ textAlign: 'center', padding: 48 }}>Загрузка...</div>
	}

	if (isAuthorized) {
		return <Navigate to='/' replace />
	}

	return children
}
