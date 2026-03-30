import { Navigate, Route, Routes } from 'react-router'

import { MyProfile } from '../pages/my-profile'
import { LoginPage } from '../pages/login'
import { TodoListPage } from '../pages/todoListPage/TodoListPage'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route
				path='/my-profile'
				element={
					<ProtectedRoute>
						<MyProfile />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<TodoListPage />
					</ProtectedRoute>
				}
			/>
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}
