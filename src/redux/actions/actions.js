import { ADD_TODO } from "./actionTypes";

export function dispatchAddTodo(todoTitle) {
  return {
    type: ADD_TODO,
    payload: { todoTitle }
  }
}
