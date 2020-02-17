import { combineReducers } from 'redux';
import todos from './reducers/todos';
import UIParameters from './reducers/UIParameters';
import filter from './reducers/filter';

export default combineReducers({ todos, UIParameters, filter });
