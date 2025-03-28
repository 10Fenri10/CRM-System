import React, { useEffect, useState } from 'react'
import { todoApi } from '../api/todoApi'
import { AddTodo } from '../components/AddTodo'
import { TodoFilters as TodoFiltersComponent } from '../components/TodoFilters'
import { TodoList } from '../components/TodoList'
import { Todo, TodoFilters, TodoStats } from '../types/todo'

export const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [stats, setStats] = useState<TodoStats>({ total: 0, active: 0, completed: 0 });
  const [filter, setFilter] = useState<TodoFilters['status']>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [todosData, statsData] = await Promise.all([
        todoApi.getAllTodos(),
        todoApi.getTodoStats(),
      ]);
      setTodos(todosData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Ошибка при загрузке данных. Пожалуйста, попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button onClick={fetchData} className="retry-button">
          Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="todo-page">
      <AddTodo onUpdate={fetchData} />
      <TodoFiltersComponent
        filter={filter}
        stats={stats}
        onFilterChange={setFilter}
      />
      <TodoList 
        todos={todos} 
        filter={filter} 
        onUpdate={fetchData}
      />
    </div>
  );
}; 