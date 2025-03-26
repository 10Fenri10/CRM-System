import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'

interface Task {
	id: number
	title: string
	created: string
	isDone: boolean
}

function App() {
	const [ToDo, setToDo] = useState<string>('')
	const [ToDos, setToDos] = useState<Task[]>([])
	const [AllToDos, setAllToDos] = useState<Task[]>([])
	const [status, setStatus] = useState<'all' | 'completed' | 'inWork'>('all')
	let doneTodos = AllToDos.filter(todo => {
		return todo.isDone == true
	})

	let notDoneTodos = AllToDos.filter(todo => {
		return todo.isDone !== true
	})

	const fetchAllTasks = async () => {
		try {
			const response = await fetch(`https://easydev.club/api/v1/todos`)
			const data = await response.json()
			setAllToDos(data.data)
		} catch (error) {
			console.error('Ошибка загрузки задач:', error)
		}
	}

	const fetchFilteredTasks = async () => {
		console.log('fetch')
		try {
			const response = await fetch(
				`https://easydev.club/api/v1/todos?filter=${status}`
			)
			const data = await response.json()
			setToDos(data.data)
		} catch (error) {
			console.error('Ошибка загрузки задач:', error)
		}
	}

	useEffect(() => {
		fetchFilteredTasks()
	}, [status])

	useEffect(() => {
		fetchAllTasks()
	}, [])

	const addTodo = async (event: React.FormEvent) => {
		event.preventDefault()

		let newTask = {
			title: ToDo,
			isDone: false,
		}

		try {
			if (newTask.title.length <= 1) {
				throw new Error(
					'Задача не может быть меньше 2 символов ;) Так мне дядя тестировщик сказал'
				)
			}
			let response = await fetch('https://easydev.club/api/v1/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(newTask),
			})

			if (!response.ok) {
				throw new Error('Ошибка при добавлении задачи')
			}

			let result: Task = await response.json()

			setToDos(prev => [...prev, result])
			setAllToDos(prev => [...prev, result])
			setToDo('')
		} catch (error) {
			alert(error)
		}
	}

	const deleteTodo = async (id: number) => {
		try {
			let response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
				method: 'DELETE',
			})

			if (!response.ok) {
				throw new Error('Ошибка при удалении')
			}

			setToDos(prev => prev.filter(todo => todo.id !== id))
			setAllToDos(prev => prev.filter(todo => todo.id !== id))
		} catch (error) {
			alert(error)
		}
	}

	const editTodo = async (id: number, newText: string, isDone: boolean) => {
		let updatedTask = {
			title: newText,
			isDone: isDone,
		}

		try {
			if (updatedTask.title.length <= 1) {
				throw new Error(
					'Задача не может быть меньше 2 символов ;) Так мне дядя тестировщик сказал'
				)
			}
			let response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
				},
				body: JSON.stringify(updatedTask),
			})

			if (!response.ok) {
				throw new Error('Ошибка при изменении')
			}

			setToDos(prev =>
				prev.map(todo => (todo.id === id ? { ...todo, ...updatedTask } : todo))
			)
			setAllToDos(prev =>
				prev.map(todo => (todo.id === id ? { ...todo, ...updatedTask } : todo))
			)
			fetchFilteredTasks()
		} catch (error) {
			alert(error)
		}
	}

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
						required
						minLength={2}
						maxLength={64}
						pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
					/>
					<button className='taskBtn' onClick={addTodo}>
						Add
					</button>
				</form>
				<div className='arrBtns'>
					<button
						className={status !== 'all' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setStatus('all')}
					>
						Все ({AllToDos.length})
					</button>
					<button
						className={status !== 'inWork' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setStatus('inWork')}
					>
						В работе ({notDoneTodos.length})
					</button>
					<button
						className={status !== 'completed' ? 'arrBtn' : 'arrBtn_focus'}
						onClick={() => setStatus('completed')}
					>
						Сделано ({doneTodos.length})
					</button>
				</div>
				<TaskList tasks={ToDos} deleteTodo={deleteTodo} editTodo={editTodo} />
			</div>
		</>
	)
}

export default App
