import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../UI/Button/Button';
import classes from './Filters.module.scss';
import { dispatchApplyFilter } from '../../redux/actions/actions';

function Filters({ activeFilter, changeFilter }) {
  const buttons = [
    { name: 'all', content: 'All' },
    { name: 'active', content: 'Active' },
    { name: 'completed', content: 'Completed' }
  ];

  return (
    <div className={classes.Filters}>
      {
        buttons.map((btn) => {
          return <Button key={btn.name}
            isActive={activeFilter === btn.name}
            onClick={changeFilter.bind(this, btn.name)}
          >
            {btn.content}
          </Button>
        })
      }
    </div>
  )
}

function mapStateToProps(state) {
  return {
    activeFilter: state.activeFilter
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeFilter: (newFilterValue) => dispatch(dispatchApplyFilter(newFilterValue))
  }
}

Filters.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
