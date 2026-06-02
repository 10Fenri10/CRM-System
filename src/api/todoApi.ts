import { MetaResponse, Todo, TodoFilters, TodoInfo } from '../types/todo'

import api from './http'

export async function getAllTodos(
	filter: TodoFilters['status']
): Promise<MetaResponse<Todo, TodoInfo>> {
	try {
		const response = await api.get(`/todos`, {
			params: {
				filter: filter,
			},
		})

		const data = await response.data

		console.log(data.data, data.info)
		return data
	} catch (error) {
		console.error('Error fetching todos:', error)
		throw error
	}
}

export async function addTodo(title: string): Promise<Todo> {
	try {
		const response = await api.post(`/todos`, {
			title,
			isDone: false,
		})

		return response.data
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
		const response = await api.put(`/todos/${id}`, updates)
		return response.data
	} catch (error) {
		console.error('Error updating todo:', error)
		throw error
	}
}

export async function deleteTodo(id: number): Promise<void> {
	try {
		await api.delete(`/todos/${id}`)
	} catch (error) {
		console.error('Error deleting todo:', error)
		throw error
	}
}
