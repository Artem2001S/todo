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
    isPinned: false
  };
}

export function getStatusBarContent(todos) {
  const uncompletedTodosCount = todos.length - getCompletedTodosCount(todos);
  let statusBarContent = `${uncompletedTodosCount} item`;

  if (uncompletedTodosCount === 1) {
    statusBarContent += ' left';
  } else {
    statusBarContent += 's left';
  }

  return statusBarContent;
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
      return todos.filter(item => !item.isCompleted);
    case 'completed':
      return todos.filter(item => item.isCompleted);
    default:
      return todos;
  }
}
