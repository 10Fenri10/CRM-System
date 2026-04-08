import './App.scss'

import React, { useEffect } from 'react'
import { subscribeAuthLogout } from './api/authEvents'
import { AppRoutes } from './routes/routes'
import { useAppDispatch } from './hooks'
import { logout, restoreSessionThunk } from './store/slice/auth'

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(restoreSessionThunk())
	}, [dispatch])

	useEffect(() => {
		return subscribeAuthLogout(() => {
			dispatch(logout())
		})
	}, [dispatch])

	return <AppRoutes />
}

export default App
