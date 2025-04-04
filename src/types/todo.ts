export interface TodoFilters {
	status: 'all' | 'inWork' | 'completed'
}
export interface Todo {
	id: number
	title: string
	created: string // ISO date string
	isDone: boolean
}

export interface TodoInfo {
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}
