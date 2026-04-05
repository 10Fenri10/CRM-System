import { Alert, Button, Card, Form, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router'
import { signup } from '../api/authApi'
import type { RegistrationFormValues } from '../types/auth'

const { Text, Paragraph } = Typography

function validateOptionalPhone(_: unknown, value: string | undefined) {
	if (value === undefined || value.trim() === '') {
		return Promise.resolve()
	}
	const digits = value.replace(/\D/g, '')
	if (digits.length < 10 || digits.length > 15) {
		return Promise.reject(new Error('Введите корректный номер телефона'))
	}
	return Promise.resolve()
}

export const RegisterPage: React.FC = () => {
	const [form] = Form.useForm<RegistrationFormValues>()
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)
	const [loading, setLoading] = useState(false)

	const onFinish = async (values: RegistrationFormValues) => {
		setError(null)
		setSuccess(false)
		setLoading(true)
		try {
			await signup({
				login: values.login.trim(),
				username: values.username.trim(),
				password: values.password,
				passwordConfirm: values.passwordConfirm,
				email: values.email.trim(),
				phoneNumber: values.phoneNumber?.trim() ?? '',
			})
			setSuccess(true)
			form.resetFields()
		} catch (e) {
			setError(e instanceof Error ? e.message : 'Ошибка регистрации')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Card title='Регистрация' style={{ width: '100%', maxWidth: 480 }}>
			{success ? (
				<>
					<Alert
						type='success'
						showIcon
						message='Регистрация прошла успешно'
						style={{ marginBottom: 16 }}
					/>
					<Paragraph style={{ marginBottom: 0 }}>
						<Link to='/login'>
							Перейти на страницу авторизации для входа в систему
						</Link>
					</Paragraph>
				</>
			) : (
				<Form<RegistrationFormValues>
					form={form}
					layout='vertical'
					onFinish={onFinish}
					requiredMark={false}
				>
					<Form.Item<RegistrationFormValues>
						label='Имя пользователя'
						name='username'
						rules={[
							{ max: 60, message: 'Не более 60 символов' },
							{
								validator: (_, value: string) => {
									if (!value?.trim()) {
										return Promise.reject(new Error('Введите имя пользователя'))
									}
									const v = value.trim()
									if (v.length > 60) {
										return Promise.reject(new Error('Не более 60 символов'))
									}
									if (!/^[\p{L}\s\-]{1,60}$/u.test(v)) {
										return Promise.reject(
											new Error(
												'Допустимы буквы русского или латинского алфавита, пробел и дефис',
											),
										)
									}
									return Promise.resolve()
								},
							},
						]}
					>
						<Input autoComplete='name' />
					</Form.Item>

					<Form.Item<RegistrationFormValues>
						label='Логин'
						name='login'
						rules={[
							{ required: true, message: 'Введите логин' },
							{
								pattern: /^[a-zA-Z]{2,60}$/,
								message: 'От 2 до 60 символов латинского алфавита',
							},
						]}
					>
						<Input autoComplete='username' />
					</Form.Item>

					<Form.Item<RegistrationFormValues>
						label='Пароль'
						name='password'
						rules={[
							{ required: true, message: 'Введите пароль' },
							{ min: 6, max: 60, message: 'От 6 до 60 символов' },
						]}
					>
						<Input.Password autoComplete='new-password' />
					</Form.Item>

					<Form.Item<RegistrationFormValues>
						label='Повторите пароль'
						name='passwordConfirm'
						dependencies={['password']}
						rules={[
							{ required: true, message: 'Подтвердите пароль' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve()
									}
									return Promise.reject(
										new Error('Пароль и подтверждение должны совпадать'),
									)
								},
							}),
						]}
					>
						<Input.Password autoComplete='new-password' />
					</Form.Item>

					<Form.Item<RegistrationFormValues>
						label='Почтовый адрес'
						name='email'
						rules={[
							{ required: true, message: 'Введите email' },
							{ type: 'email', message: 'Некорректный email' },
						]}
					>
						<Input autoComplete='email' />
					</Form.Item>

					<Form.Item<RegistrationFormValues>
						label='Телефон'
						name='phoneNumber'
						rules={[{ validator: validateOptionalPhone }]}
					>
						<Input placeholder='Необязательно' autoComplete='tel' />
					</Form.Item>

					{error ? (
						<div style={{ color: '#cf1322', marginBottom: 12 }}>{error}</div>
					) : null}

					<Form.Item>
						<Button type='primary' htmlType='submit' block loading={loading}>
							Зарегистрироваться
						</Button>
					</Form.Item>

					<Text type='secondary'>
						Уже есть аккаунт? <Link to='/login'>Войти</Link>
					</Text>
				</Form>
			)}
		</Card>
	)
}
