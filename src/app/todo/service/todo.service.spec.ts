import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should add a new todo in the waiting column', () => {
    service.addTodo('cours', 'réviser les signaux');

    expect(service.waitingTodos().length).toBe(1);
    expect(service.waitingTodos()[0].status).toBe('waiting');
  });

  it('should move a todo to another column when its status changes', () => {
    service.addTodo('cours', 'réviser les signaux');
    const id = service.waitingTodos()[0].id;

    service.changeStatus(id, 'done');

    expect(service.waitingTodos().length).toBe(0);
    expect(service.doneTodos().length).toBe(1);
  });

  it('should delete a todo', () => {
    service.addTodo('cours', 'réviser les signaux');
    const id = service.waitingTodos()[0].id;

    service.deleteTodo(id);

    expect(service.waitingTodos().length).toBe(0);
  });
});
