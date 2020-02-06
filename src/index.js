import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/rootReducer';

const LOCAL_STORAGE_KEY = 'redux-store';

const preLoadedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || undefined;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  preLoadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
})

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
