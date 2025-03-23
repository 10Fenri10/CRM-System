import { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'

type TaskProps = {
	title: string
	id: number
	completed: boolean
	deleteTodo: (currentId: number) => void
	editTodo: (currentId: number, newValue: string) => void
	chekedTodo: (currentId: number) => void
}

export default function Task({
	title,
	id,
	completed,
	deleteTodo,
	editTodo,
	chekedTodo,
}: TaskProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')

	return (
		<div className='taskContainer'>
			<div className='text'>
				{completed ? (
					<>
						<input
							id='chekInput'
							className='chekInput'
							type='checkbox'
							onChange={e => {
								chekedTodo(id)
							}}
							checked
						/>

						<label htmlFor='chekInput'></label>
						<s className='taskTitleDone'>{title}</s>
					</>
				) : (
					<>
						<input
							id='chekInput'
							className='chekInput'
							type='checkbox'
							onChange={e => {
								chekedTodo(id)
							}}
						/>

						<label htmlFor='chekInput'></label>
						<p className='taskTitle'>{title}</p>
					</>
				)}
			</div>

			<div className='btns'>
				<button
					onClick={() => {
						event?.preventDefault()
						deleteTodo(id)
					}}
					className='trashBtn'
				>
					<FaRegTrashAlt
						style={{ fontSize: '24px', backgroundColor: 'red' }}
						color='white'
					/>
				</button>
				<button
					onClick={() => {
						// editTodo(id)
						setIsOpen(true)
					}}
					className='editBtn'
				>
					<FaRegEdit
						style={{
							fontSize: '24px',
							backgroundColor: 'rgba(83, 147, 255, 1)',
						}}
						color='white'
					/>
				</button>
			</div>

			{isOpen && (
				<div className='overlay'>
					<div className='popup'>
						<h2>Введите данные</h2>
						<input
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							placeholder='Введите текст'
						/>
						<div className='buttons'>
							<button
								onClick={() => {
									editTodo(id, inputValue)
									setIsOpen(false)
								}}
							>
								Изменить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
