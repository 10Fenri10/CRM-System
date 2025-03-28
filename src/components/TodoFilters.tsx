import React from 'react'
import { TodoFilters as TodoFiltersType, TodoStats } from '../types/todo'

interface TodoFiltersProps {
  filter: TodoFiltersType['status'];
  stats: TodoStats;
  onFilterChange: (filter: TodoFiltersType['status']) => void;
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  stats,
  onFilterChange,
}) => {
  return (
    <div className="todo-filters">
      <button
        onClick={() => onFilterChange('all')}
        className={filter === 'all' ? 'active' : ''}
      >
        Все<span className="count">({stats.total})</span>
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={filter === 'active' ? 'active' : ''}
      >
        В работе<span className="count">({stats.active})</span>
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        Сделано<span className="count">({stats.completed})</span>
      </button>
    </div>
  );
}; 