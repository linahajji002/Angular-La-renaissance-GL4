import { Injectable, computed, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private nextId = 1;

  /** La seule source de vérité : modifiable uniquement par ce service */
  private todos = signal<Todo[]>([]);

  /** Les colonnes sont dérivées de la liste, elles se recalculent toutes seules */
  readonly waitingTodos = this.todosByStatus('waiting');
  readonly inProgressTodos = this.todosByStatus('in progress');
  readonly doneTodos = this.todosByStatus('done');

  /**
   * Ajoute un todo, toujours dans la colonne waiting
   *
   * @param name: string
   * @param content: string
   */
  addTodo(name: string, content: string): void {
    const todo: Todo = { id: this.nextId++, name, content, status: 'waiting' };
    this.todos.update((todos) => [...todos, todo]);
  }

  /**
   * Change le statut d'un todo, ce qui le fait changer de colonne
   *
   * @param id: number
   * @param status: TodoStatus
   */
  changeStatus(id: number, status: TodoStatus): void {
    this.todos.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  }

  /**
   * Supprime le todo s'il existe
   *
   * @param id: number
   */
  deleteTodo(id: number): void {
    this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  private todosByStatus(status: TodoStatus) {
    return computed(() => this.todos().filter((todo) => todo.status === status));
  }
}
