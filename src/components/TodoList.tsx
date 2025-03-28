import React from 'react'
import { Todo, TodoFilters } from '../types/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[];
  filter: TodoFilters['status'];
  onUpdate: () => Promise<void>;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, filter, onUpdate }) => {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <div key={todo.id}>
          <TodoItem todo={todo} onUpdate={onUpdate} />
        </div>
      ))}
    </div>
  );
}; 