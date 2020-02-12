import * as actionTypes from './actionTypes';

export function dispatchAddTodo(id, todoTitle) {
  return {
    type: actionTypes.ADD_TODO,
    payload: { todoTitle, id }
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

export function dispatchApplyFilter(newFilter) {
  return {
    type: actionTypes.APPLY_FILTER,
    payload: { newFilter }
  };
}

export function disptachPinTodo(todoId) {
  return {
    type: actionTypes.PIN_TODO,
    payload: { todoId }
  };
}

export function dispatchChangeIsTabletVersion(newValue) {
  return {
    type: actionTypes.CHANGE_IS_TABLET_VERSION,
    payload: { newValue }
  };
}
