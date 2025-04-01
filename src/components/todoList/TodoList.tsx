import React from 'react'
import { Todo } from '../../types/todo'
import { TodoItem } from '../todoItem/TodoItem'
import styles from './TodoList.module.scss'

interface TodoListProps {
	todos: Todo[]
	onUpdate: () => Promise<void>
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate }) => {
	return (
		<ul className={styles.todo_list}>
			{todos.map(todo => (
				<li key={todo.id}>
					<TodoItem todo={todo} onUpdate={onUpdate} />
				</li>
			))}
		</ul>
	)
}
