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
