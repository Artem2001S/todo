import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Todo from './containers/Todo/Todo';
import { UIParametersContext } from './Contexts/UIParametersContext';
import { TABLET_WIDTH } from 'constants.js';
import { dispatchChangeIsTabletVersion } from 'redux/actions/actions';

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
    <>
      <UIParametersContext.Provider value={{ isTabletVersion }}>
        <Todo />
      </UIParametersContext.Provider>
    </>
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
