import * as actionTypes from './actionTypes';

export function dispatchAddTodo(todoTitle) {
  return {
    type: actionTypes.ADD_TODO,
    payload: { todoTitle }
  };
}

export function dispatchToggleTodo(todoId) {
  return {
    type: actionTypes.TOGGLE_TODO,
    payload: { todoId }
  };
}

export function dispatchDeleteTodo(todoId) {
  return {
    type: actionTypes.DELETE_TODO,
    payload: { todoId }
  };
}

export function dispatchDeleteCompletedTodos() {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS
  };
}

export function dispatchToggleAllTodos() {
  return {
    type: actionTypes.TOGGLE_ALL_TODOS
  };
}

export function dispatchChangeTodoTitle(todoId, newTitle) {
  return {
    type: actionTypes.CHANGE_TODO_TITLE,
    payload: { todoId, newTitle }
  };
}

export function dispatchApplyFilter(newFilterValue) {
  const filters = ['all', 'active', 'completed'];
  const filter = filters.includes(newFilterValue) ? newFilterValue : 'all';

  return {
    type: actionTypes.APPLY_FILTER,
    payload: { newFilter: filter }
  };
}

export function disptachPinTodo(todoId) {
  return {
    type: actionTypes.PIN_TODO,
    payload: { todoId }
  };
}
