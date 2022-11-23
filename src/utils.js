import { isBefore, isSameDay, startOfDay } from 'date-fns';

export function getCompletedTodosCount(todos) {
  return todos.reduce((accum, todo) => {
    if (todo.isCompleted) return accum + 1;
    return accum;
  }, 0);
}

export function createTodoObject(id, todoTitle) {
  return {
    id,
    text: todoTitle,
    isCompleted: false,
    isPinned: false,
    createdAt: new Date().valueOf(),
    isUrgent: false,
    progress: 0
  };
}

export function getStatusBarContent(todos) {
  const uncompletedTodosCount = todos.length - getCompletedTodosCount(todos);
  let statusBarContent = `Осталось задач: ${uncompletedTodosCount}`;

  return statusBarContent;
}

export function getCompletedPercent(todos) {
  const all = todos.length;
  const percent = (getCompletedTodosCount(todos) * 100) / all;
  return Math.round(percent);
}

export function filter(todos, filter) {
  let todos_ = todos;

  switch (filter.filterType) {
    case 'all':
      return todos;
    case 'active':
      todos_ = todos.filter(item => !item.isCompleted);
      break;
    case 'completed':
      return todos.filter(item => item.isCompleted);
    default:
      todos_ = todos;
  }

  return todos_.filter(todo => {
    return (
      isSameDay(todo.createdAt, new Date()) ||
      (!todo.isCompleted && isBefore(todo.createdAt, startOfDay(new Date())))
    );
  });
}
