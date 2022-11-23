import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './AddForm.module.scss';
import Alert from '../UI/Alert/Alert';
import { addOrSetTodo } from 'firebaseHelpers/index';
import { createTodoObject } from 'utils';

export default function AddForm({
  submitHandler,
  onToggleAll,
  isToggleBtnActive,
  isEmpty
}) {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const toggleAllBtnClasses = classNames(classes.ToggleAllBtn, {
    [classes.Active]: isToggleBtnActive
  });

  return (
    <form
      className={classes.AddForm}
      onSubmit={e => {
        e.preventDefault();
        if (!value.trim()) {
          setErrorMessage(true);
          return;
        }

        const id = new Date().valueOf();
        submitHandler(id, value.trim());
        setValue('');
        addOrSetTodo(createTodoObject(id, value.trim()));
        setErrorMessage(false);
      }}
    >
      {errorMessage && <Alert>Enter data!</Alert>}
      <div>
        {/* {!isEmpty && (
          <div onClick={onToggleAll} className={toggleAllBtnClasses}>
            ❯
          </div>
        )} */}

        <input
          className={classes.Input}
          type="text"
          placeholder="Название задачи"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </div>
    </form>
  );
}

AddForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  onToggleAll: PropTypes.func.isRequired
};
