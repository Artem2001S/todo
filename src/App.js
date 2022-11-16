import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { UIParametersContext } from './Contexts/UIParametersContext';
import { TABLET_WIDTH } from 'constants.js';
import { changeIsTabletVersion, loadTodos } from 'redux/actions/actions';
import TodosContainer from 'containers/TodosContainer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getTodos } from 'firebaseHelpers';

function App({ isTabletVersion, changeIsTabletVersion }) {
  const [isTablet, setIsTablet] = useState(isTabletVersion);
  const dispatch = useDispatch();

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

  useEffect(() => {
    getTodos(data => {
      dispatch(
        loadTodos(
          Object.keys(data)
            .map(id => {
              return data[id];
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        )
      );
    });
  }, [dispatch]);

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
