import {
	LogoutOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAppDispatch, useAuth } from '../hooks'
import { logoutThunk } from '../store/slice/auth'

const MyMenu: React.FC = () => {
	const dispatch = useAppDispatch()
	const { isAuthorized } = useAuth()
	const navigate = useNavigate()
	const location = useLocation()

	const handleChangePage = (to: string) => {
		navigate(to)
	}

	const menuItems = [
		{ key: 'tasks', path: '/' },
		{ key: 'profile', path: '/my-profile' },
		{ key: 'login', path: '/login' },
	]

	const selectedKeys = (() => {
		if (!isAuthorized) {
			return location.pathname === '/login' ? ['login'] : []
		}

		const activeItem = menuItems.find(item => item.path === location.pathname)

		return activeItem ? [activeItem.key] : []
	})()

	const handleLogout = async () => {
		try {
			await dispatch(logoutThunk()).unwrap()
		} finally {
			navigate('/login')
		}
	}

	return (
		<Menu
			theme='dark'
			mode='inline'
			selectedKeys={selectedKeys}
			items={
				isAuthorized
					? [
							{
								key: 'profile',
								icon: <UserOutlined />,
								label: 'Профиль',
								onClick: () => handleChangePage('/my-profile'),
							},
							{
								key: 'tasks',
								icon: <UnorderedListOutlined />,
								label: 'Список задач',
								onClick: () => handleChangePage('/'),
							},
							{
								key: 'logout',
								icon: <LogoutOutlined />,
								label: 'Выйти',
								onClick: () => {
									void handleLogout()
								},
							},
						]
					: [
							{
								key: 'login',
								icon: <UserOutlined />,
								label: 'Войти',
								onClick: () => handleChangePage('/login'),
							},
						]
			}
		/>
	)
}

export default MyMenu
