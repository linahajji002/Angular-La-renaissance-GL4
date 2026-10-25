import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';
import { TODO_STATUSES, Todo, TodoStatus } from '../model/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCardComponent {
  todo = input.required<Todo>();

  statusChange = output<TodoStatus>();
  remove = output<void>();

  /** Les statuts vers lesquels ce todo peut encore aller */
  otherStatuses = computed(() =>
    TODO_STATUSES.filter((status) => status !== this.todo().status)
  );
}
