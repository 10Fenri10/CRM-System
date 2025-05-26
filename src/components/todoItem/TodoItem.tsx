import { Button, Checkbox, Form } from 'antd'
import Input from 'antd/es/input/Input'
import React, { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { FaCheck, FaX } from 'react-icons/fa6'
import { deleteTodo, updateTodo } from '../../api/todoApi'
import { Todo } from '../../types/todo'
import styles from './TodoItem.module.scss'

interface TodoItemProps {
	todo: Todo
	onUpdate: () => Promise<void>
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(false)
	const [isEditing, setIsEditing] = useState<boolean>(false)

	const [form] = Form.useForm()

	const handleToggle = async () => {
		try {
			setIsDisabled(true)
			await updateTodo(todo.id, { isDone: !todo.isDone })
			await onUpdate()
		} catch (error) {
			console.error('Error toggling todo:', error)
		} finally {
			setIsDisabled(false)
		}
	}

	const handleDelete = async () => {
		try {
			setIsDisabled(true)
			await deleteTodo(todo.id)
			await onUpdate()
		} catch (error) {
			console.error('Error deleting todo:', error)
		} finally {
			setIsDisabled(false)
		}
	}

	const handleEdit = async () => {
		const { todo: editedTitle } = await form.validateFields()
		const trimedTitle = editedTitle.trim()

		try {
			setIsDisabled(true)
			await updateTodo(todo.id, { title: trimedTitle })
			setIsEditing(false)
			await onUpdate()
		} catch (error) {
			console.error('Error updating todo:', error)
		} finally {
			setIsDisabled(false)
		}
	}

	const handleCancelEdit = () => {
		setIsEditing(false)

		form.resetFields()
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.key === 'Enter') handleEdit()
		if (e.key === 'Escape') handleCancelEdit()
	}

	return (
		<div className={styles.todo_item}>
			<div className={styles.todo_content}>
				<Checkbox
					checked={todo.isDone}
					onChange={handleToggle}
					disabled={isDisabled}
					style={{ paddingRight: '8px' }}
				/>
				{isEditing ? (
					<Form
						form={form}
						initialValues={{ todo: todo.title }}
						onFinish={handleEdit}
						className={styles.edit_form}
					>
						<Form.Item
							label=''
							name='todo'
							style={{ flex: 1, marginBottom: 0 }}
							rules={[
								{ required: true, message: 'Задача не может быть пустой!' },
								{
									min: 2,
									max: 64,
									message:
										'Задача не может быть короче 2 и длинее 64 символов!',
								},
								{
									pattern: new RegExp('.{1,64}'),
									message: 'Задача не может иметь данные символы!',
								},
							]}
						>
							<Input
								type='text'
								onKeyDown={handleKeyDown}
								disabled={isDisabled}
								autoFocus
							/>
						</Form.Item>

						<Button variant='outlined' htmlType='submit' disabled={isDisabled}>
							<FaCheck size={20} />
						</Button>
						<Button
							variant='outlined'
							onClick={handleCancelEdit}
							className={styles.cancel}
						>
							<FaX size={20} />
						</Button>
					</Form>
				) : (
					<span
						className={
							!todo.isDone ? styles.todo_title : styles.todo_titleCompleted
						}
					>
						{todo.title}
					</span>
				)}
			</div>
			<div className={styles.todo_actions}>
				{!isEditing && (
					<>
						<Button
							variant='outlined'
							disabled={isDisabled}
							onClick={() => setIsEditing(true)}
						>
							<FaRegEdit size={20} />
						</Button>
						<Button
							variant='outlined'
							onClick={handleDelete}
							disabled={isDisabled}
						>
							<FaRegTrashAlt size={20} />
						</Button>
					</>
				)}
			</div>
		</div>
	)
}
