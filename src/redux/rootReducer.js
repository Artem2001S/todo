import { ADD_TODO, TOGGLE_TODO, DELETE_TODO, DELETE_COMPLETED_TODOS, TOGGLE_ALL_TODOS } from "./actions/actionTypes";
import { getCompletedTodosCount, createTodoObject } from "./utils";

const initialState = {
  todos: [],
};

initialState.completedTodosCount = getCompletedTodosCount(initialState.todos);

export default function rootReducer(state = initialState, action) {
  let newTodos = [...state.todos];
  const { payload } = action;

  let index;

  if (payload !== undefined && payload.todoId) {
    index = newTodos.findIndex((todo) => todo.id === payload.todoId);
  }

  switch (action.type) {
    case ADD_TODO:
      newTodos = [createTodoObject(action.payload.todoTitle), ...newTodos];
      break;
    case TOGGLE_TODO:
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      break;
    case DELETE_TODO:
      newTodos.splice(index, 1);
      break;
    case DELETE_COMPLETED_TODOS:
      newTodos = newTodos.filter((todo) => !todo.isCompleted);
      break;
    case TOGGLE_ALL_TODOS:
      if (newTodos.length === getCompletedTodosCount(newTodos)) {
        newTodos = newTodos.map((todo) => { return { ...todo, isCompleted: false } });
      } else {
        newTodos = newTodos.map((todo) => { return { ...todo, isCompleted: true } });
      }
      break;
    default:
      return state;
  }

  return {
    todos: newTodos,
    completedTodosCount: getCompletedTodosCount(newTodos),
  };
}
