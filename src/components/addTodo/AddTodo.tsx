import React, { useState } from 'react'
import { todoApi } from '../../api/todoApi'
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
			await todoApi.addTodo(trimedTitle)
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
				<input
					type='text'
					value={title}
					onChange={handleChangeTitle}
					placeholder='Task To Be Done...'
					disabled={isSubmitting}
					minLength={2}
					maxLength={64}
					pattern='.{2,64}'
					autoFocus
				/>
				<button type='submit' disabled={isSubmitting}>
					Add
				</button>
			</div>
		</form>
	)
}
