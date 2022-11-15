import * as actionTypes from './actionTypes';

export function addTodo(id, todoTitle) {
  return {
    type: actionTypes.ADD_TODO,
    payload: { todoTitle, id }
  };
}

export function toggleTodo(todoId, authorName, date) {
  return {
    type: actionTypes.TOGGLE_TODO,
    payload: { todoId, authorName, date }
  };
}

export function setDate(date) {
  return {
    type: actionTypes.SET_DATE,
    payload: date
  };
}

export function deleteTodo(todoId) {
  return {
    type: actionTypes.DELETE_TODO,
    payload: { todoId }
  };
}

export function deleteCompletedTodos() {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS
  };
}

export function toggleAllTodos() {
  return {
    type: actionTypes.TOGGLE_ALL_TODOS
  };
}

export function changeTodoTitle(todoId, newTitle) {
  return {
    type: actionTypes.CHANGE_TODO_TITLE,
    payload: { todoId, newTitle }
  };
}

export function applyFilter(newFilter) {
  return {
    type: actionTypes.APPLY_FILTER,
    payload: { newFilter }
  };
}

export function pinTodo(todoId) {
  return {
    type: actionTypes.PIN_TODO,
    payload: { todoId }
  };
}

export function changeIsTabletVersion(newValue) {
  return {
    type: actionTypes.CHANGE_IS_TABLET_VERSION,
    payload: { newValue }
  };
}
