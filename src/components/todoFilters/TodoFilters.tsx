import React from 'react'
import { TodoFilters as TodoFiltersType, TodoInfo } from '../../types/todo'
import styles from './TodoFilters.module.scss'

interface TodoFiltersProps {
	filter: TodoFiltersType['status']
	status: TodoInfo
	onFilterChange: (filter: TodoFiltersType['status']) => void
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
	filter,
	status,
	onFilterChange,
}) => {
	return (
		<div className={styles.todo_filters}>
			<button
				onClick={() => onFilterChange('all')}
				className={filter === 'all' ? styles.active : ''}
			>
				Все<span className={styles.count}>({status.all})</span>
			</button>
			<button
				onClick={() => onFilterChange('inWork')}
				className={filter === 'inWork' ? styles.active : ''}
			>
				В работе<span className={styles.count}>({status.inWork})</span>
			</button>
			<button
				onClick={() => onFilterChange('completed')}
				className={filter === 'completed' ? styles.active : ''}
			>
				Сделано<span className={styles.count}>({status.completed})</span>
			</button>
		</div>
	)
}
