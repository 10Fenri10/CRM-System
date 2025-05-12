import { Route, Routes } from 'react-router'

import { MyProfile } from '../pages/my-profile'
import { TodoListPage } from '../pages/todoListPage/TodoListPage'

export const AppRoutes = () => {
	const navigationRoutes = [
		{ path: '/my-profile', element: <MyProfile /> },
		{ path: '/', element: <TodoListPage /> },
	]
	return (
		<Routes>
			{navigationRoutes.map(route => (
				<Route key={route.path} path={route.path} element={route.element} />
			))}
		</Routes>
	)
}
