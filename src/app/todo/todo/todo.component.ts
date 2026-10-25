import { Component, ChangeDetectionStrategy, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { TodoCardComponent } from '../todo-card/todo-card.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TodoCardComponent],
})
export class TodoComponent {
  private todoService = inject(TodoService);

  name = signal('');
  content = signal('');
  canAdd = computed(() => !!this.name().trim() && !!this.content().trim());

  /** Décrit les trois colonnes pour ne pas répéter le même HTML trois fois */
  columns = [
    { title: 'Waiting', css: 'bg-secondary-subtle', todos: this.todoService.waitingTodos },
    { title: 'In Progress Todos', css: 'bg-warning-subtle', todos: this.todoService.inProgressTodos },
    { title: 'Done Todos', css: 'bg-success-subtle', todos: this.todoService.doneTodos },
  ];

  addTodo() {
    this.todoService.addTodo(this.name().trim(), this.content().trim());
    this.name.set('');
    this.content.set('');
  }

  changeStatus(id: number, status: TodoStatus) {
    this.todoService.changeStatus(id, status);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id);
  }
}
