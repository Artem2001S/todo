import { initializeApp } from 'firebase/app';
import { get, getDatabase, onValue, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyC_qvjiREHQxllAAN47pKb6MOQ6vuPL0w0',
  authDomain: 'ih-todo-app.firebaseapp.com',
  databaseURL:
    'https://ih-todo-app-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'ih-todo-app',
  storageBucket: 'ih-todo-app.appspot.com',
  messagingSenderId: '441723138833',
  appId: '1:441723138833:web:0b5597eb2cdec67ed4d2b0',
  measurementId: 'G-MN2HREFMXL'
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const getTodos = async onValueProp => {
  const todosRef = ref(db, 'todos');
  onValue(todosRef, snapshot => {
    const data = snapshot.val();
    onValueProp && onValueProp(data);
  });
};

export const addOrSetTodo = async todo => {
  return set(ref(db, 'todos/' + todo.id), todo);
};

export const removeTodoFb = async id => {
  return set(ref(db, 'todos/' + id), null);
};
