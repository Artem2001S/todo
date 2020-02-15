import * as actionTypes from '../actions/actionTypes';
import { getCompletedTodosCount, createTodoObject } from '../../utils';

const initialState = [];

export default function todos(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [...state, createTodoObject(payload.id, payload.todoTitle)];
    case actionTypes.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === payload.todoId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    case actionTypes.DELETE_TODO:
      return state.filter(todo => todo.id !== payload.todoId);
    case actionTypes.DELETE_COMPLETED_TODOS:
      return state.filter(todo => !todo.isCompleted);
    case actionTypes.TOGGLE_ALL_TODOS:
      return state.length === getCompletedTodosCount(state)
        ? state.map(todo => ({ ...todo, isCompleted: false }))
        : state.map(todo => ({ ...todo, isCompleted: true }));
    case actionTypes.CHANGE_TODO_TITLE:
      return state.map(todo =>
        todo.id === payload.todoId ? { ...todo, text: payload.newTitle } : todo
      );
    case actionTypes.PIN_TODO:
      return state
        .map(todo =>
          todo.id === payload.todoId
            ? { ...todo, isPinned: !todo.isPinned }
            : todo
        )
        .sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1;
          if (a.isPinned && b.isPinned) return 0;
          if (!a.isPinned && b.isPinned) return 1;
          return 0;
        });
    default:
      return state;
  }
}
