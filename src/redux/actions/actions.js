import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETE_COMPLETED_TODOS } from "./actionTypes";

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
