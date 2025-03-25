import Task from './Task'

interface TaskType {
	id: number
	title: string
	created: string
	isDone: boolean
}

interface TaskListProps {
	tasks: TaskType[]
	deleteTodo: (id: number) => void
	editTodo: (id: number, newText: string, isDone: boolean) => void
}

export default function TaskList({
	tasks,
	deleteTodo,
	editTodo,
}: TaskListProps) {
	if (!tasks.length) return <p>Нет задач</p>

	return (
		<div className='Todos'>
			{tasks.map(item => (
				<Task
					key={item.id}
					title={item.title}
					id={item.id}
					completed={item.isDone}
					onDelete={deleteTodo}
					onEdit={editTodo}
				/>
			))}
		</div>
	)
}
