import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { addTodo } from '../../api/todoApi'
import styles from './AddTodo.module.scss'

interface AddTodoProps {
	onUpdate: () => Promise<void>
}

export const AddTodo: React.FC<AddTodoProps> = ({ onUpdate }) => {
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
	const [form] = Form.useForm()

	const handleSubmit = async () => {
		const { todo: title } = await form.validateFields()

		const trimedTitle = title.trim()

		console.log(trimedTitle, trimedTitle.length)

		if (trimedTitle.length < 2 || trimedTitle.length > 64) {
			alert('Неверное количество символов. Допустимо от 2 до 64')
			return
		}

		try {
			setIsSubmitting(true)
			await addTodo(trimedTitle)
			form.resetFields()
			await onUpdate()
		} catch (error) {
			console.error('Error adding todo:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Form form={form} onFinish={handleSubmit} className={styles.todo_form}>
			<div className={styles.form_group}>
				<Form.Item
					label=''
					name='todo'
					style={{ flex: 1, marginBottom: 0 }}
					rules={[
						{ required: true, message: 'Задача не может быть пустой!' },
						{
							min: 2,
							max: 64,
							message: 'Задача не может быть короче 2 и длинее 64 символов!',
						},
						{
							pattern: new RegExp('.{1,64}'),
							message: 'Задача не может иметь данные символы!',
						},
					]}
				>
					<Input
						type='text'
						disabled={isSubmitting}
						placeholder='Task To Be Done...'
						autoFocus
					/>
				</Form.Item>

				<Button
					disabled={isSubmitting}
					style={{ height: '100%' }}
					type='primary'
					htmlType='submit'
				>
					Add
				</Button>
			</div>
		</Form>
	)
}
