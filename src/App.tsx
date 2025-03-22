import { useState } from 'react'
import './App.css'

function App() {
	type Task = {
		id: number
		title: string
		completed: boolean
	}

	const [ToDos, setToDos] = useState<Task[]>([])
	const [ToDo, setToDo] = useState<string>('')
	const addTodo = () => {
		event?.preventDefault()
		const ID = Date.now()
		setToDos([...ToDos, { id: ID, title: ToDo, completed: false }])
		console.log(ToDos)
	}

	return (
		<>
			<div className='container'>
				<form onSubmit={addTodo} className='inputContainer'>
					<input
						placeholder='Task To Be Done...'
						type='text'
						onChange={e => setToDo(e.target.value)}
						className='taskInput'
					/>
					<button className='taskBtn' onClick={addTodo}>
						Add
					</button>
				</form>

				{ToDos.map(item => {
					return item.title
				})}
			</div>
		</>
	)
}

export default App
