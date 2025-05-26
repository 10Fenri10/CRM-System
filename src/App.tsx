import './App.scss'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Layout, theme } from 'antd'
import React, { useState } from 'react'
import MyMenu from './components/MyMenu'
import { AppRoutes } from './routes/routes'

const { Header, Sider, Content } = Layout

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken()

	return (
		<Layout style={{ height: '100vh' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<div className='demo-logo-vertical' />
				<MyMenu />
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
