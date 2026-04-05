import { Button, Checkbox, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import { useAppDispatch, useAuth } from '../../hooks'
import { loginThunk } from '../../store/slice/auth'
import type { LoginCredentials } from '../../types/auth'

import './login.scss'

// function AuthMarkLogo() {
// 	return (
// 		<svg
// 			className='login-page__logo'
// 			viewBox='0 0 40 40'
// 			fill='none'
// 			xmlns='http://www.w3.org/2000/svg'
// 			aria-hidden
// 		>
// 			<path
// 				d='M20 4v32M4 20h32'
// 				stroke='currentColor'
// 				strokeWidth='2.5'
// 				strokeLinecap='round'
// 			/>
// 			<path
// 				d='M10 10l20 20M30 10L10 30'
// 				stroke='currentColor'
// 				strokeWidth='2.5'
// 				strokeLinecap='round'
// 				opacity='0.45'
// 			/>
// 		</svg>
// 	)
// }

import logo from '../../assets/Group 1686550876.svg'
export const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isLogged, status } = useAuth()

	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (status === 'authenticated' && isLogged) {
			navigate('/')
		}
	}, [isLogged, navigate, status])

	const onFinish = async (
		values: LoginCredentials & { remember?: boolean },
	) => {
		setError(null)
		try {
			await dispatch(loginThunk(values)).unwrap()
			navigate('/')
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Sign-in failed')
		}
	}

	return (
		<div className='login-page'>
			{/* <AuthMarkLogo /> */}
			<img src={logo} alt='logo' className='login-page__logo' />
			<h1 className='login-page__title'>Login to your Account</h1>
			<p className='login-page__subtitle'>
				See what is going on with your business
			</p>

			<Form<LoginCredentials & { remember?: boolean }>
				layout='vertical'
				onFinish={onFinish}
				requiredMark={false}
				initialValues={{ remember: true }}
			>
				<Form.Item<LoginCredentials>
					label='Email'
					name='email'
					rules={[
						{ required: true, message: 'Please enter your email' },
						{ type: 'email', message: 'Enter a valid email' },
					]}
				>
					<Input size='large' placeholder='mail@abc.com' autoComplete='email' />
				</Form.Item>

				<Form.Item<LoginCredentials>
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please enter your password' }]}
				>
					<Input.Password size='large' autoComplete='current-password' />
				</Form.Item>

				<div className='login-page__row'>
					<Form.Item name='remember' valuePropName='checked' noStyle>
						<Checkbox className='login-page__checkbox'>Remember Me</Checkbox>
					</Form.Item>
					<a className='login-page__forgot' href='#forgot-password'>
						Forgot Password?
					</a>
				</div>

				{error ? <div className='login-page__error'>{error}</div> : null}

				<Form.Item style={{ marginBottom: 0 }}>
					<Button
						type='primary'
						htmlType='submit'
						block
						className='login-page__submit'
					>
						Login
					</Button>
				</Form.Item>
			</Form>

			<div className='login-page__footer'>
				Not Registered Yet?{' '}
				<RouterLink className='login-page__footer-link' to='/register'>
					Create an account
				</RouterLink>
			</div>
		</div>
	)
}
