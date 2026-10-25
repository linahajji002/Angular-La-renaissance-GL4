export type TodoStatus = 'waiting' | 'in progress' | 'done';

export const TODO_STATUSES: TodoStatus[] = ['waiting', 'in progress', 'done'];

export interface Todo {
  id: number;
  name: string;
  content: string;
  status: TodoStatus;
}
