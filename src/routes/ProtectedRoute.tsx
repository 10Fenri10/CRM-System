import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks'

type ProtectedRouteProps = {
	children: React.ReactElement
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { isAuthorized, status } = useAuth()

	if (status === 'checking') {
		return <div>Загрузка...</div>
	}

	if (!isAuthorized) {
		return <Navigate to='/login' replace />
	}

	return children
}
