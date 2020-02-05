import { ADD_TODO } from "./actions/actionTypes";

const initialState = {
  todos: []
}

export default function rootReducer(state = initialState, action) {
  const newTodos = [...state.todos];

  switch (action.type) {
    case ADD_TODO:
      return {
        todos: [createTodoObject(action.payload.todoTitle), ...newTodos]
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
