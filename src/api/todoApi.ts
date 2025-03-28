import { Todo, TodoStats } from '../types/todo'

const API_BASE_URL = 'https://easydev.club/api/v1';

export const todoApi = {
  async getAllTodos(): Promise<Todo[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      return data.data.map((todo: any) => ({
        id: todo.id,
        title: todo.title,
        completed: todo.isDone,
        createdAt: todo.created,
        updatedAt: todo.created,
      }));
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  async getTodoStats(): Promise<TodoStats> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todo stats');
      const data = await response.json();
      const todos = data.data;
      return {
        total: todos.length,
        active: todos.filter((todo: any) => !todo.isDone).length,
        completed: todos.filter((todo: any) => todo.isDone).length,
      };
    } catch (error) {
      console.error('Error fetching todo stats:', error);
      throw error;
    }
  },

  async addTodo(title: string): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, isDone: false }),
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const data = await response.json();
      return {
        id: data.id,
        title: data.title,
        completed: data.isDone,
        createdAt: data.created,
        updatedAt: data.created,
      };
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updates.title,
          isDone: updates.completed,
        }),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const data = await response.json();
      return {
        id: data.id,
        title: data.title,
        completed: data.isDone,
        createdAt: data.created,
        updatedAt: data.created,
      };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  async deleteTodo(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
}; 