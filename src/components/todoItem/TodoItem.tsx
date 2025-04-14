import { Button, Checkbox } from 'antd'
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
	const [editedTitle, setEditedTitle] = useState<string>(todo.title)

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
		const trimedTitle = editedTitle.trim()

		if (trimedTitle.length < 2 || trimedTitle.length > 64) {
			alert('Неверное количество символов. Допустимо от 2 до 64')
			return
		}

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
		setEditedTitle(todo.title)
	}

	const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = e => {
		setEditedTitle(e.target.value)
	}

	const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.key === 'Enter') handleEdit()
		if (e.key === 'Escape') handleCancelEdit()
	}

	// <Space.Compact style={{ width: '100%' }}>
	// 				<Input
	// 					value={title}
	// 					onChange={handleChangeTitle}
	// 					type='text'
	// 					disabled={isSubmitting}
	// 					minLength={2}
	// 					maxLength={64}
	// 					pattern='.{2,64}'
	// 					placeholder='Task To Be Done...'
	// 					autoFocus
	// 				/>
	// 				<Button
	// 					disabled={isSubmitting}
	// 					style={{ height: '100%' }}
	// 					type='primary'
	// 				>
	// 					Add
	// 				</Button>
	// 			</Space.Compact>
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
					<form className={styles.edit_form}>
						<Input
							type='text'
							value={editedTitle}
							onChange={handleChangeTitle}
							onKeyDown={handleKeyDown}
							minLength={2}
							maxLength={64}
							pattern='.{1,64}'
							disabled={isDisabled}
							autoFocus
						/>
						<Button
							variant='outlined'
							onClick={handleEdit}
							disabled={isDisabled}
						>
							<FaCheck size={20} />
						</Button>
						<Button
							variant='outlined'
							onClick={handleCancelEdit}
							className={styles.cancel}
						>
							<FaX size={20} />
						</Button>
					</form>
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
