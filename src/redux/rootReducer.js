import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  DELETE_COMPLETED_TODOS,
  TOGGLE_ALL_TODOS,
  CHANGE_TODO_TITLE,
  APPLY_FILTER,
  PIN_TODO
} from './actions/actionTypes';
import {
  getCompletedTodosCount,
  createTodoObject,
  getStatusBarContent,
  getCompletedPercent,
  filter
} from './utils';

const initialState = {
  todos: [],
  filteredTodos: [],
  statusBarContnet: '0 items left',
  completedTodosCount: 0,
  completedPercent: 0,
  activeFilter: 'all'
};

export default function rootReducer(state = initialState, action) {
  let newTodos = [...state.todos];
  const { payload } = action;

  let index;

  if (payload !== undefined && payload.todoId) {
    index = newTodos.findIndex(todo => todo.id === payload.todoId);
  }

  switch (action.type) {
    case ADD_TODO:
      newTodos = [...newTodos, createTodoObject(action.payload.todoTitle)];
      break;
    case TOGGLE_TODO:
      newTodos[index] = {
        ...newTodos[index],
        isCompleted: !newTodos[index].isCompleted
      };
      break;
    case DELETE_TODO:
      newTodos.splice(index, 1);
      break;
    case DELETE_COMPLETED_TODOS:
      newTodos = newTodos.filter(todo => !todo.isCompleted);
      break;
    case TOGGLE_ALL_TODOS:
      if (newTodos.length === getCompletedTodosCount(newTodos)) {
        newTodos = newTodos.map(todo => {
          return { ...todo, isCompleted: false };
        });
      } else {
        newTodos = newTodos.map(todo => {
          return { ...todo, isCompleted: true };
        });
      }
      break;
    case CHANGE_TODO_TITLE:
      const { newTitle } = payload;
      newTodos[index].text = newTitle;
      break;
    case APPLY_FILTER:
      const { newFilter } = payload;
      state.activeFilter = newFilter;
      break;
    case PIN_TODO:
      newTodos[index] = {
        ...newTodos[index],
        isPinned: !newTodos[index].isPinned
      };
      newTodos.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (a.isPinned && b.isPinned) return 0;
        if (!a.isPinned && b.isPinned) return 1;
      });
      break;
    default:
      return state;
  }

  return {
    todos: newTodos,
    filteredTodos: filter(newTodos, state.activeFilter),
    completedTodosCount: getCompletedTodosCount(newTodos),
    statusBarContnet: getStatusBarContent(newTodos),
    completedPercent: getCompletedPercent(newTodos),
    activeFilter: state.activeFilter
  };
}
