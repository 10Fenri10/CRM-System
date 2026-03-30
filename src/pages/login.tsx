import { Button, Card, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth, useAppDispatch } from '../hooks'
import { loginThunk } from '../store/slice/auth'
import type { LoginCredentials } from '../types/auth'

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

	const onFinish = async (values: LoginCredentials) => {
		setError(null)
		try {
			await dispatch(loginThunk(values)).unwrap()
			navigate('/')
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Ошибка входа')
		}
	}

	return (
		<Card title='Вход' style={{ maxWidth: 420, margin: '24px auto' }}>
			<Form<LoginCredentials> layout='vertical' onFinish={onFinish} requiredMark={false}>
				<Form.Item<LoginCredentials>
					label='Email'
					name='email'
					rules={[
						{ required: true, message: 'Введите email' },
						{ type: 'email', message: 'Некорректный email' },
					]}
				>
					<Input autoComplete='email' />
				</Form.Item>

				<Form.Item<LoginCredentials>
					label='Пароль'
					name='password'
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password autoComplete='current-password' />
				</Form.Item>

				{error ? (
					<div style={{ color: '#b00020', marginBottom: 12 }}>{error}</div>
				) : null}

				<Form.Item>
					<Button type='primary' htmlType='submit' block>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</Card>
	)
}

