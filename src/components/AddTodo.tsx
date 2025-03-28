import React, { useState } from 'react'
import { todoApi } from '../api/todoApi'

interface AddTodoProps {
  onUpdate: () => Promise<void>;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onUpdate }) => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      setIsSubmitting(true);
      await todoApi.addTodo(title.trim());
      setTitle('');
      await onUpdate();
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task To Be Done..."
          disabled={isSubmitting}
          minLength={2}
          maxLength={64}
          pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
          autoFocus
        />
        <button type="submit" disabled={isSubmitting}>
          Add
        </button>
      </div>
    </form>
  );
}; 