import { combineReducers } from 'redux';
import todos from './reducers/todos';
import UIParameters from './reducers/UIParameters';

export default combineReducers({ todos, UIParameters });
