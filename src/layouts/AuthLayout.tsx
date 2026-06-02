import { ConfigProvider } from 'antd'
import React from 'react'
import { Outlet } from 'react-router'

import heroIllustration from '../assets/skeleton-auth.svg'
import './AuthLayout.scss'

export const AuthLayout: React.FC = () => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#7f265b',
					borderRadius: 8,
					fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
					controlHeightLG: 48,
				},
			}}
		>
			<div className='auth-layout'>
				<aside className='auth-layout__brand'>
					<div className='auth-layout__brand-inner'>
						<img
							className='auth-layout__illustration'
							src={heroIllustration}
							alt=''
						/>
						<h1 className='auth-layout__headline'>
							Turn your ideas into reality.
						</h1>
						<p className='auth-layout__sub'>
							Start for free and get attractive offers from the community
						</p>
					</div>
				</aside>
				<main className='auth-layout__panel'>
					<div className='auth-layout__panel-inner'>
						<Outlet />
					</div>
				</main>
			</div>
		</ConfigProvider>
	)
}
