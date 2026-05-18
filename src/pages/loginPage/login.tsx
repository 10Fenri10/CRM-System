import { Button, Checkbox, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router'
import { useAppDispatch, useAuth } from '../../hooks'
import { loginThunk } from '../../store/slice/auth'
import { type AuthData } from '../../types/auth'

import './login.scss'

import logo from '../../assets/Group 1686550876.svg'
export const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { isAuthorized, status } = useAuth()

	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (status === 'authenticated' && isAuthorized) {
			navigate('/')
		}
	}, [isAuthorized, navigate, status])

	const onFinish = async (values: AuthData & { remember?: boolean }) => {
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

			<Form<AuthData & { remember?: boolean }>
				layout='vertical'
				onFinish={onFinish}
				requiredMark={false}
				initialValues={{ remember: true }}
			>
				<Form.Item<AuthData>
					label='login'
					name='login'
					rules={[
						{ required: true, message: 'Please enter your login' },
						{ type: 'string', message: 'Enter a valid login' },
					]}
				>
					<Input size='large' placeholder='Buba777' />
				</Form.Item>

				<Form.Item<AuthData>
					label='Password'
					name='password'
					rules={[{ required: true, message: 'Please enter your password' }]}
				>
					<Input.Password size='large' autoComplete='current-password' />
				</Form.Item>

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

			<div className='login-page__row'>
				<Checkbox className='login-page__checkbox'>Remember Me</Checkbox>

				<a className='login-page__forgot' href='#forgot-password'>
					Forgot Password?
				</a>
			</div>

			<div className='login-page__footer'>
				Not Registered Yet?{' '}
				<RouterLink className='login-page__footer-link' to='/register'>
					Create an account
				</RouterLink>
			</div>
		</div>
	)
}
