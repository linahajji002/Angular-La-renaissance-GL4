import { TODO_STATUSES } from './todo';

describe('Todo', () => {
  it('should list every status once', () => {
    expect(TODO_STATUSES).toEqual(['waiting', 'in progress', 'done']);
  });
});
