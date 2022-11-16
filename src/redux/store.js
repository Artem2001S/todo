import { createStore } from 'redux';
import rootReducer from './rootReducer';

const LOCAL_STORAGE_KEY = 'redux-store';

const preLoadedState =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || undefined;

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  preLoadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      UIParameters: state.UIParameters,
      filter: state.filter
    })
  );
});

export default store;
