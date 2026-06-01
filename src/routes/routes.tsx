import { Navigate, Route, Routes } from 'react-router'

import { AuthLayout } from '../layouts/AuthLayout'
import { MainLayout } from '../layouts/MainLayout'
import { LoginPage } from '../pages/loginPage/LoginPage'
import { MyProfilePage } from '../pages/MyProfilePage'
import { RegisterPage } from '../pages/RegisterPage'
import { TodoListPage } from '../pages/todoListPage/TodoListPage'
import { GuestRoute } from './GuestRoute'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRoutes = () => {
	return (
		<Routes>
			<Route element={<AuthLayout />}>
				<Route
					path='/login'
					element={
						<GuestRoute>
							<LoginPage />
						</GuestRoute>
					}
				/>
				<Route
					path='/register'
					element={
						<GuestRoute>
							<RegisterPage />
						</GuestRoute>
					}
				/>
			</Route>
			<Route element={<MainLayout />}>
				<Route
					path='/my-profile'
					element={
						<ProtectedRoute>
							<MyProfilePage />
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
			</Route>
			<Route path='*' element={<Navigate to='/' replace />} />
		</Routes>
	)
}
