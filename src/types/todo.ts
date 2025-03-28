export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
}

export interface TodoStats {
  total: number;
  active: number;
  completed: number;
} 