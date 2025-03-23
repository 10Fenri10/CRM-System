import { useState } from 'react'
import './App.css'
import Task from './components/task/Task'

function App() {
	type Task = {
		id: number
		title: string
		completed: boolean
	}

	const [ToDos, setToDos] = useState<Task[]>([])
	const [ToDo, setToDo] = useState<string>('')
	// const [renderArr, serRenderArr] = useState<Task[]>(ToDos)
	let doneTodos = ToDos.filter(todo => {
		return todo.completed == true
	})

	let notDoneTodos = ToDos.filter(todo => {
		return todo.completed !== true
	})

	const deleteTodo = (currentId: number) => {
		console.log(currentId)
		setToDos([
			...ToDos.filter(todo => {
				console.log(todo.id !== currentId)
				return todo.id !== currentId
			}),
		])
	}

	const editTodo = (currentId: number, newValue: string) => {
		console.log(currentId)
		const editToDo = ToDos.find(todo => todo.id == currentId)
		if (editToDo) {
			editToDo.title = newValue
		}
		setToDos([...ToDos])
	}

	const chekedTodo = (currentId: number) => {
		console.log(currentId)
		const editToDo = ToDos.find(todo => todo.id == currentId)
		if (editToDo) {
			editToDo.completed = !editToDo.completed
		}
		setToDos([...ToDos])
	}

	const addTodo = async () => {
		event?.preventDefault()
		const ID = Date.now()
		setToDos([...ToDos, { id: ID, title: ToDo, completed: false }])
		setToDo('')
	}

	const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all')

	const filteredTasks = ToDos.filter(task => {
		if (filter === 'completed') return task.completed
		if (filter === 'pending') return !task.completed
		return true
	})

	return (
		<>
			<div className='container'>
				<form onSubmit={addTodo} className='inputContainer'>
					<input
						id='todoInput'
						placeholder='Task To Be Done...'
						type='text'
						onChange={e => {
							setToDo(e.target.value)
						}}
						value={ToDo}
						className='taskInput'
					/>
					<button className='taskBtn' onClick={addTodo}>
						Add
					</button>
				</form>
				<div className='arrBtns'>
					<button
						className={filter !== 'all' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setFilter('all')}
					>
						Все {ToDos.length}
					</button>
					<button
						className={filter !== 'completed' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setFilter('completed')}
					>
						Выполненные {doneTodos.length}
					</button>
					<button
						className={filter !== 'pending' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setFilter('pending')}
					>
						Невыполненные {notDoneTodos.length}
					</button>
				</div>

				<div className='Todos'>
					{filteredTasks.map(item => {
						return (
							<Task
								key={item.id}
								title={item.title}
								id={item.id}
								completed={item.completed}
								deleteTodo={deleteTodo}
								editTodo={editTodo}
								chekedTodo={chekedTodo}
							/>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default App
