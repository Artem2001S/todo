import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classes from './App.module.scss';
import { UIParametersContext } from './Contexts/UIParametersContext';
import { TABLET_WIDTH } from 'constants.js';
import { dispatchChangeIsTabletVersion } from 'redux/actions/actions';
import TodoAppHeader from 'containers/TodoAppHeader';
import VisibleTodoList from 'containers/VisibleTodoList';
import TodosContainer from 'containers/TodosContainer';

function App({ isTabletVersion, changeIsTabletVersion }) {
  const [isTablet, setIsTablet] = useState(isTabletVersion);

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

  return (
    <div>
      <UIParametersContext.Provider value={{ isTabletVersion }}>
        {/* <TodoAppHeader />
        <VisibleTodoList /> */}
        <TodosContainer />
      </UIParametersContext.Provider>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isTabletVersion: state.UIParameters.isTabletVersion
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeIsTabletVersion: newValue =>
      dispatch(dispatchChangeIsTabletVersion(newValue))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
