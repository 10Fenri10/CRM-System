import { useState } from 'react'
import { FaCheck, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { ImCross } from 'react-icons/im'

type TaskProps = {
	title: string
	id: number
	completed: boolean
	onDelete: (id: number) => void
	onEdit: (id: number, newText: string, isDone: boolean) => void
}

export default function Task({
	title,
	id,
	completed,
	onDelete,
	onEdit,
}: TaskProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>(`${title}`)

	return (
		<div className='taskContainer'>
			<div className='text'>
				{completed ? (
					<>
						<input
							id='chekInput'
							className='chekInput'
							type='checkbox'
							onChange={() => {
								onEdit(id, title, !completed)
							}}
							defaultChecked={true}
						/>

						<label htmlFor='chekInput'></label>
						{isOpen ? (
							<>
								<input
									className='taskInput'
									type='text'
									value={inputValue}
									onChange={e => setInputValue(e.target.value)}
									placeholder='Введите текст'
									required
									minLength={2}
									maxLength={64}
									pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
								/>
							</>
						) : (
							<>
								<s className='taskTitleDone'>{title}</s>
							</>
						)}
					</>
				) : (
					<>
						<input
							id='chekInput'
							className='chekInput'
							type='checkbox'
							onChange={() => {
								onEdit(id, title, !completed)
							}}
						/>

						<label htmlFor='chekInput'></label>
						{isOpen ? (
							<>
								<input
									className='taskInput'
									type='text'
									value={inputValue}
									onChange={e => setInputValue(e.target.value)}
									placeholder='Введите текст'
									required
									minLength={2}
									maxLength={64}
									pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
								/>
							</>
						) : (
							<>
								<p className='taskTitle'>{title}</p>
							</>
						)}
					</>
				)}
			</div>

			{isOpen ? (
				<>
					<div className='btns'>
						<button
							onClick={event => {
								event.preventDefault()
								onEdit(id, inputValue, completed)
								setIsOpen(false)
							}}
							className='editBtn'
						>
							<FaCheck
								style={{
									fontSize: '24px',
									backgroundColor: 'rgba(83, 147, 255, 1)',
								}}
								color='white'
							/>
						</button>
						<button
							onClick={event => {
								event.preventDefault()
								setIsOpen(false)
							}}
							className='trashBtn'
						>
							<ImCross
								style={{ fontSize: '24px', backgroundColor: 'red' }}
								color='white'
							/>
						</button>
					</div>
				</>
			) : (
				<>
					<div className='btns'>
						<button
							onClick={() => {
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
						<button onClick={() => onDelete(id)} className='trashBtn'>
							<FaRegTrashAlt
								style={{ fontSize: '24px', backgroundColor: 'red' }}
								color='white'
							/>
						</button>
					</div>
				</>
			)}

			{/* <div className='btns'>
				<button
					onClick={() => {
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
				<button onClick={() => onDelete(id)} className='trashBtn'>
					<FaRegTrashAlt
						style={{ fontSize: '24px', backgroundColor: 'red' }}
						color='white'
					/>
				</button>
			</div>

			{isOpen && (
				<div className='overlay'>
					<form
						onSubmit={event => {
							event.preventDefault()
							onEdit(id, inputValue, completed)
							setIsOpen(false)
						}}
						className='popup'
					>
						<h2>Введите данные</h2>
						<input
							type='text'
							value={inputValue}
							onChange={e => setInputValue(e.target.value)}
							placeholder='Введите текст'
							required
							minLength={2}
							maxLength={64}
							pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
						/>
						<div>
							<button className='editBtn' type='submit'>
								Изменить
							</button>
						</div>
					</form>
				</div>
			)} */}
		</div>
	)
}
