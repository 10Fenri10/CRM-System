import './App.scss'

// function App() {
// 	return (
// 		<div className='min-h-screen bg-gray-100'>
// 			<TodoListPage />
// 		</div>
// 	)
// }

// export default App

import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UnorderedListOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { AppRoutes } from './routes/routes'

const { Header, Sider, Content } = Layout

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	const navigate = useNavigate()

	const handleChangePage = (to: string) => {
		navigate(to)
	}

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical' />
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
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG,
					}}
				>
					{/* <TodoListPage /> */}
					<AppRoutes />
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
