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
	const [editedTitle, setEditedTitle] = useState<string>(todo.title)
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
					<Form form={form} onFinish={handleEdit} className={styles.edit_form}>
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
								value={editedTitle}
								defaultValue={editedTitle}
								onChange={handleChangeTitle}
								onKeyDown={handleKeyDown}
								disabled={isDisabled}
								autoFocus
							/>
						</Form.Item>

						<Button
							variant='outlined'
							// onClick={handleEdit}
							htmlType='submit'
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

// import React from 'react';
// import type { FormProps } from 'antd';
// import { Button, Checkbox, Form, Input } from 'antd';

// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

// const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
//   console.log('Success:', values);
// };

// const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

// const App: React.FC = () => (
//   <Form
//     name="basic"
//     labelCol={{ span: 8 }}
//     wrapperCol={{ span: 16 }}
//     style={{ maxWidth: 600 }}
//     initialValues={{ remember: true }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
{
	/* <Form.Item<FieldType>
  label="Username"
  name="username"
  rules={[{ required: true, message: 'Please input your username!' }]}
>
  <Input />
</Form.Item> */
}

//     <Form.Item<FieldType>
//       label="Password"
//       name="password"
//       rules={[{ required: true, message: 'Please input your password!' }]}
//     >
//       <Input.Password />
//     </Form.Item>

//     <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
//       <Checkbox>Remember me</Checkbox>
//     </Form.Item>

//     <Form.Item label={null}>
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
// );

// export default App;
