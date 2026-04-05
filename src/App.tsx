import './App.scss'

import React, { useEffect } from 'react'
import { AppRoutes } from './routes/routes'
import { useAppDispatch } from './hooks'
import { restoreSessionThunk } from './store/slice/auth'

const App: React.FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(restoreSessionThunk())
	}, [dispatch])

	return <AppRoutes />
}

export default App
