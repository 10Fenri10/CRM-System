import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router'

const MyMenu: React.FC = () => {
	const navigate = useNavigate()

	const handleChangePage = (to: string) => {
		navigate(to)
	}

	return (
		<Menu
			theme='dark'
			mode='inline'
			defaultSelectedKeys={['2']}
			items={[
				{
					key: '1',
					icon: <UserOutlined />,
					label: 'Профиль',
					onClick: () => {
						handleChangePage('/my-profile')
					},
				},
				{
					key: '2',
					icon: <UnorderedListOutlined />,
					label: 'Список задач ',
					onClick: () => {
						handleChangePage('/')
					},
				},
			]}
		/>
	)
}

export default MyMenu
