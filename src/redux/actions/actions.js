import { ADD_TODO, TOGGLE_TODO } from "./actionTypes";

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
