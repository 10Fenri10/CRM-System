import React, { useEffect, useState } from 'react'
import { getAllTodos } from '../../api/todoApi'
import { AddTodo } from '../../components/addTodo/AddTodo'
import { TodoFilters as TodoFiltersComponent } from '../../components/todoFilters/TodoFilters'
import { TodoList } from '../../components/todoList/TodoList'
import { Todo, TodoFilters, TodoInfo } from '../../types/todo'
import styles from './TodoListPage.module.scss'

export const TodoListPage: React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([])
	const [status, setStatus] = useState<TodoInfo>({
		all: 0,
		completed: 0,
		inWork: 0,
	})
	const [filter, setFilter] = useState<TodoFilters['status']>('all')
	// const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const fetchData = async () => {
		try {
			// setIsLoading(true)
			setError(null)

			const todosData = await getAllTodos(filter)
			setTodos(todosData.data)
			if (todosData.info) {
				setStatus(todosData.info)
			}
		} catch (error) {
			console.error('Error fetching data:', error)
			setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.')
		} finally {
			// setIsLoading(false)
		}
	}

	useEffect(() => {
		console.log('fetch')
		fetchData()
		const fetch = setInterval(() => {
			fetchData()
		}, 5000)

		return () => clearInterval(fetch)
	}, [filter])

	//До конца не знаю стоит ли оставлять ведь часто появляетсяна экране
	// if (isLoading) {
	// 	return <div className={styles.loading}>Загрузка...</div>
	// }

	if (error) {
		return (
			<div className={styles.error_container}>
				<div className={styles.error}>{error}</div>
				<button onClick={fetchData} className={styles.retry_button}>
					Повторить
				</button>
			</div>
		)
	}

	return (
		<div className={styles.todo_page}>
			<AddTodo onUpdate={fetchData} />
			<TodoFiltersComponent
				filter={filter}
				status={status}
				onFilterChange={setFilter}
			/>
			<TodoList todos={todos} onUpdate={fetchData} />
		</div>
	)
}
