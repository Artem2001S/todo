import { ADD_TODO, TOGGLE_TODO } from "./actions/actionTypes";

const initialState = {
  todos: []
}

export default function rootReducer(state = initialState, action) {
  const newTodos = [...state.todos];
  const { payload } = action;

  let index;

  if (payload !== undefined && payload.todoId) {
    index = newTodos.findIndex((todo) => todo.id === payload.todoId);
  }

  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [createTodoObject(action.payload.todoTitle), ...newTodos]
      }
    case TOGGLE_TODO:
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      return {
        todos: newTodos
      }
    default:
      return state;
  }
}

const createTodoObject = (todoTitle) => {
  return {
    id: new Date().valueOf(),
    text: todoTitle,
    isCompleted: false
  }
}
