import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UIParametersContext } from './Contexts/UIParametersContext';
import { TABLET_WIDTH } from 'constants.js';
import { changeIsTabletVersion, loadTodos } from 'redux/actions/actions';
import TodosContainer from 'containers/TodosContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  getTodos,
  subscribeChildAdded,
  subscribeTodoChange
} from 'firebaseHelpers';
import sound from './components/AddForm/sirena.mp3';
import checkSound from './components/TodoItem/icq.mp3';

function App({ isTabletVersion, changeIsTabletVersion }) {
  useEffect(() => {
    document.body.style.zoom = '50%';
  }, []);
  const [isTablet, setIsTablet] = useState(isTabletVersion);
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(checkIsTabletVersion());
    };

    const checkIsTabletVersion = () => {
      return window.innerWidth <= TABLET_WIDTH;
    };

    changeIsTabletVersion(isTablet);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [changeIsTabletVersion, isTablet]);

  const isInitialized = useRef(false);

  useEffect(() => {
    getTodos(data => {
      isInitialized.current = true;
      if (data) {
        dispatch(
          loadTodos(
            Object.keys(data)
              .map(id => {
                return data[id];
              })
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .sort((a, b) => b.isPinned - a.isPinned)
          )
        );
      } else {
        dispatch(loadTodos([]));
      }
    });

    return () => {
      // unsubscribe();
    };
  }, [dispatch]);

  const handlers = useRef(null);

  useEffect(() => {
    const init = async () => {
      handlers.current = await subscribeTodoChange(data => {
        const prev = data && todos.find(todo => todo.id === data.id);
        if (data && data?.isCompleted && !prev.isCompleted) {
          const audio = new Audio(checkSound);
          audio.play();
        }
      });
    };
    init();
    return () => {
      if (handlers.current) {
        handlers.current();
      }
    };
  }, [todos]);

  useEffect(() => {
    const unsubscribe = subscribeChildAdded(() => {
      if (isInitialized.current) {
        const audio = new Audio(sound);
        audio.play();
        console.log('playe');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UIParametersContext.Provider value={{ isTabletVersion }}>
      <Router>
        <Switch>
          <Route path="/">
            <TodosContainer />
          </Route>
          <Route path="/add">
            <TodosContainer />
          </Route>
        </Switch>
      </Router>
    </UIParametersContext.Provider>
  );
}

function mapStateToProps(state) {
  return {
    isTabletVersion: state.UIParameters.isTabletVersion
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeIsTabletVersion: newValue => dispatch(changeIsTabletVersion(newValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
