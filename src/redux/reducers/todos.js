import * as actionTypes from '../actions/actionTypes';
import {
  getCompletedTodosCount,
  createTodoObject,
  getStatusBarContent,
  getCompletedPercent,
  filter
} from '../utils';

const initialState = {
  todoList: [],
  filteredTodos: [],
  statusBarContnet: '0 items left',
  completedTodosCount: 0,
  completedPercent: 0,
  activeFilter: 'all'
};

export default function todos(state = initialState, action) {
  let newTodos = [...state.todoList];
  const { payload } = action;

  let index;

  if (payload !== undefined && payload.todoId) {
    index = newTodos.findIndex(todo => todo.id === payload.todoId);
  }

  switch (action.type) {
    case actionTypes.ADD_TODO:
      newTodos = [...newTodos, createTodoObject(action.payload.todoTitle)];
      break;
    case actionTypes.TOGGLE_TODO:
      newTodos[index] = {
        ...newTodos[index],
        isCompleted: !newTodos[index].isCompleted
      };
      break;
    case actionTypes.DELETE_TODO:
      newTodos.splice(index, 1);
      break;
    case actionTypes.DELETE_COMPLETED_TODOS:
      newTodos = newTodos.filter(todo => !todo.isCompleted);
      break;
    case actionTypes.TOGGLE_ALL_TODOS:
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
    case actionTypes.CHANGE_TODO_TITLE:
      const { newTitle } = payload;
      newTodos[index].text = newTitle;
      break;
    case actionTypes.APPLY_FILTER:
      const { newFilter } = payload;
      state.activeFilter = newFilter;
      break;
    case actionTypes.PIN_TODO:
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
    todoList: newTodos,
    filteredTodos: filter(newTodos, state.activeFilter),
    completedTodosCount: getCompletedTodosCount(newTodos),
    statusBarContnet: getStatusBarContent(newTodos),
    completedPercent: getCompletedPercent(newTodos),
    activeFilter: state.activeFilter
  };
}
