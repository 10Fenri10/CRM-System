import { Button, Input, Space } from 'antd'
import React, { useState } from 'react'
import { addTodo } from '../../api/todoApi'
import styles from './AddTodo.module.scss'

interface AddTodoProps {
	onUpdate: () => Promise<void>
}

export const AddTodo: React.FC<AddTodoProps> = ({ onUpdate }) => {
	const [title, setTitle] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const trimedTitle = title.trim()
		if (!trimedTitle) {
			return
		}

		if (trimedTitle.length < 2 || trimedTitle.length > 64) {
			alert('Неверное количество символов. Допустимо от 2 до 64')
			return
		}

		try {
			setIsSubmitting(true)
			await addTodo(trimedTitle)
			setTitle('')
			await onUpdate()
		} catch (error) {
			console.error('Error adding todo:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = e => {
		setTitle(e.target.value)
	}

	return (
		<form onSubmit={handleSubmit} className={styles.todo_form}>
			<div className={styles.form_group}>
				<Space.Compact style={{ width: '100%' }}>
					<Input
						value={title}
						onChange={handleChangeTitle}
						type='text'
						disabled={isSubmitting}
						minLength={2}
						maxLength={64}
						pattern='.{1,64}'
						placeholder='Task To Be Done...'
						autoFocus
					/>
					<Button
						disabled={isSubmitting}
						style={{ height: '100%' }}
						type='primary'
					>
						Add
					</Button>
				</Space.Compact>
			</div>
		</form>
	)
}
