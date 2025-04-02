import { MetaResponse, Todo, TodoFilters, TodoInfo } from '../types/todo'

const API_BASE_URL = 'https://easydev.club/api/v1'

export async function getAllTodos(
	filter: TodoFilters['status']
): Promise<MetaResponse<Todo, TodoInfo>> {
	try {
		const response = await fetch(`${API_BASE_URL}/todos?filter=${filter}`)
		if (!response.ok) throw new Error('Failed to fetch todos')
		const data = await response.json()

		console.log(data.data, data.info)
		return data
	} catch (error) {
		console.error('Error fetching todos:', error)
		throw error
	}
}

export async function addTodo(title: string): Promise<Todo> {
	try {
		const response = await fetch(`${API_BASE_URL}/todos`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, isDone: false }),
		})
		if (!response.ok) throw new Error('Failed to add todo')
		const data = await response.json()

		return data
	} catch (error) {
		console.error('Error adding todo:', error)
		throw error
	}
}

export async function updateTodo(
	id: number,
	updates: Partial<Todo>
): Promise<Todo> {
	try {
		const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updates),
		})
		if (!response.ok) throw new Error('Failed to update todo')
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error updating todo:', error)
		throw error
	}
}

export async function deleteTodo(id: number): Promise<void> {
	try {
		const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
			method: 'DELETE',
		})
		if (!response.ok) throw new Error('Failed to delete todo')
	} catch (error) {
		console.error('Error deleting todo:', error)
		throw error
	}
}
