import { Button } from 'antd'
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
			<Button
				onClick={() => onFilterChange('all')}
				size='large'
				type={filter === 'all' ? 'primary' : 'default'}
			>
				Все<span className={styles.count}>({status.all})</span>
			</Button>
			<Button
				onClick={() => onFilterChange('inWork')}
				size='large'
				type={filter === 'inWork' ? 'primary' : 'default'}
			>
				В работе<span className={styles.count}>({status.inWork})</span>
			</Button>
			<Button
				onClick={() => onFilterChange('completed')}
				size='large'
				type={filter === 'completed' ? 'primary' : 'default'}
			>
				Сделано<span className={styles.count}>({status.completed})</span>
			</Button>
		</div>
	)
}
