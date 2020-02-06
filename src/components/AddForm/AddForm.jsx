import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './AddForm.module.scss';
import Alert from '../UI/Alert/Alert';
import {
  dispatchAddTodo,
  dispatchToggleAllTodos
} from '../../redux/actions/actions';

function AddForm({ sumbitHandler, onToggleAll, isToggleBtnActive, isEmpty }) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const toggleAllBtnClasses = [classes.ToggleAllBtn];
  if (isToggleBtnActive) {
    toggleAllBtnClasses.push(classes.Active);
  }

  return (
    <form
      className={classes.AddForm}
      onSubmit={e => {
        e.preventDefault();
        if (value === '') {
          setErrorMessage(true);
          return;
        }

        sumbitHandler(value.trim());
        setValue('');
        setErrorMessage(false);
      }}
    >
      {errorMessage ? <Alert>Enter data!</Alert> : null}
      <div>
        {isEmpty ? null : (
          <div onClick={onToggleAll} className={toggleAllBtnClasses.join(' ')}>
            ❯
          </div>
        )}

        <input
          className={classes.Input}
          type="text"
          placeholder="What needs to be done ?"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </div>
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    sumbitHandler: todoTitle => dispatch(dispatchAddTodo(todoTitle)),
    onToggleAll: () => dispatch(dispatchToggleAllTodos())
  };
}

AddForm.propTypes = {
  sumbitHandler: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(AddForm);
