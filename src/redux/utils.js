export function getCompletedTodosCount(todos) {
  return todos.reduce((accum, todo) => {
    if (todo.isCompleted) return accum + 1;
    return accum;
  }, 0);
}

export function createTodoObject(todoTitle) {
  return {
    id: new Date().valueOf(),
    text: todoTitle,
    isCompleted: false
  }
}

export function getStatusBarContent(todos) {
  const uncompletedTodosCount = todos.length - getCompletedTodosCount(todos);
  let statusBarContnet = `${uncompletedTodosCount} item`;

  if (uncompletedTodosCount === 1) {
    statusBarContnet += ' left';
  } else {
    statusBarContnet += 's left';
  }

  return statusBarContnet;
}

export function getCompletedPercent(todos) {
  const all = todos.length;
  const percent = (getCompletedTodosCount(todos) * 100) / all;
  return Math.round(percent);
}

export function filter(todos, filter) {
  switch (filter) {
    case 'all':
      return todos;
    case 'active':
      return todos.filter((item) => !item.isCompleted);
    case 'completed':
      return todos.filter((item) => item.isCompleted);
    default:
      return todos;
  }
}
