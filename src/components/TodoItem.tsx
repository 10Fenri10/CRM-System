import React, { useState } from 'react'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import { FaCheck, FaX } from 'react-icons/fa6'
import { todoApi } from '../api/todoApi'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo;
  onUpdate: () => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggle = async () => {
    try {
      setIsUpdating(true);
      await todoApi.updateTodo(todo.id, { completed: !todo.completed });
      await onUpdate();
    } catch (error) {
      console.error('Error toggling todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {

    try {
      setIsDeleting(true);
      await todoApi.deleteTodo(todo.id);
      await onUpdate();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = async () => {
    if (!editedTitle.trim() || editedTitle.trim().length < 2) return;

    try {
      setIsUpdating(true);
      await todoApi.updateTodo(todo.id, { title: editedTitle.trim() });
      setIsEditing(false);
      await onUpdate();
    } catch (error) {
      console.error('Error updating todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  return (
    <div className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isUpdating}
        />
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEdit();
                if (e.key === 'Escape') handleCancelEdit();
              }}
              minLength={2}
              maxLength={64}
              pattern='[A-Za-zА-Яа-яЁё0-9\s]+'
              disabled={isUpdating}
              autoFocus
            />
            <button
              onClick={handleEdit}
              className="save"
              disabled={isUpdating}
            >
                
              <FaCheck size={20}  />
            </button>
            <button
              onClick={handleCancelEdit}
              className="cancel"
            >
             
              <FaX size={20}  />
            </button>
          </div>
        ) : (
          <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
            {todo.title}
          </span>
        )}
      </div>
      <div className="todo-actions">
        {!isEditing && (
          <>
            <button
              className="edit"
              disabled={isUpdating || isDeleting}
              onClick={() => setIsEditing(true)}
            >
              
              <FaRegEdit size={20} />
            </button>
            <button
              className="delete"
              onClick={handleDelete}
              disabled={isDeleting || isUpdating}
            >
               
                <FaRegTrashAlt size={20}/>

            </button>
          </>
        )}
      </div>
    </div>
  );
}; 