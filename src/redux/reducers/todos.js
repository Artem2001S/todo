import * as actionTypes from '../actions/actionTypes';
import { getCompletedTodosCount, createTodoObject } from '../../utils';

const initialState = [];

export default function todos(state = initialState, action) {
  const { payload } = action;

  switch (action.type) {
    case actionTypes.ADD_TODO:
      return [createTodoObject(payload.id, payload.todoTitle), ...state];
    case actionTypes.SET_TODO:
      const exists = state.find(todo => todo.id === payload?.id);
      if (exists) {
        return state.map(todo => (todo.id === payload.id ? payload : todo));
      }
      return [payload, ...state];
    case actionTypes.TOGGLE_TODO:
      return state.map(todo =>
        todo.id === payload.todoId
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              authorName: payload.authorName || todo.authorName,
              completedDate: payload.date
            }
          : todo
      );
    case actionTypes.TOGGLE_URGENT_TODO:
      return state.map(todo =>
        todo.id === payload.todoId
          ? {
              ...todo,
              isUrgent: !todo.isUrgent
            }
          : todo
      );
    case actionTypes.DELETE_TODO:
      return state.filter(todo => todo.id !== payload.todoId);
    case actionTypes.DELETE_COMPLETED_TODOS:
      return state.filter(todo => !todo.isCompleted);
    case actionTypes.TOGGLE_ALL_TODOS:
      return state.map(todo => ({
        ...todo,
        isCompleted: state.length !== getCompletedTodosCount(state)
      }));
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
        .sort((a, b) => b.isPinned - a.isPinned);
    default:
      return state;
  }
}
