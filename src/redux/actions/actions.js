import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETE_COMPLETED_TODOS, TOGGLE_ALL_TODOS, CHANGE_TODO_TITLE } from "./actionTypes";

export function dispatchAddTodo(todoTitle) {
  return {
    type: ADD_TODO,
    payload: { todoTitle }
  }
}

export function dispatchToggleTodo(todoId) {
  return {
    type: TOGGLE_TODO,
    payload: { todoId }
  }
}

export function dispatchDeleteTodo(todoId) {
  return {
    type: DELETE_TODO,
    payload: { todoId }
  }
}

export function dispatchDeleteCompletedTodos() {
  return {
    type: DELETE_COMPLETED_TODOS
  }
}

export function dispatchToggleAllTodos() {
  return {
    type: TOGGLE_ALL_TODOS
  }
}

export function dispatchChangeTodoTitle(todoId, newTitle) {
  return {
    type: CHANGE_TODO_TITLE,
    payload: { todoId, newTitle }
  }
}
