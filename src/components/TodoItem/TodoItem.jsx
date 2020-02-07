import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classes from './TodoItem.module.scss';
import {
  dispatchChangeTodoTitle,
  dispatchToggleTodo,
  dispatchDeleteTodo,
  disptachPinTodo
} from '../../redux/actions/actions';

function TodoItem({ todo, onToggle, onRemove, onUpdate, onTodoPinning }) {
  const inputRef = React.createRef();
  const checkboxRef = React.createRef();
  const todoTitleRef = React.createRef();

  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  let needToUpdate = true;

  const checkboxClasses = [classes.checkboxToggle];
  const todoContentClasses = [classes.ContentBlock];

  if (todo.isCompleted) {
    checkboxClasses.push(classes.Active);
  }

  if (todo.isPinned) {
    todoContentClasses.push(classes.Pinned);
    checkboxClasses.push(classes.Pinned);
  }

  const startTodoEditing = () => {
    inputRef.current.style.display = 'block';
    hideElement(checkboxRef);

    inputRef.current.focus();

    // set short value (for displaying input with small height)
    todoTitleRef.current.textContent = '1';
  };

  const endTodoEditing = () => {
    showElement(checkboxRef);
    inputRef.current.style.display = 'none';
    const finalValue = (needToUpdate ? valueToUpdate : todo.text).trim();

    if (finalValue === '') {
      onRemove.call(this, todo.id);
      return;
    }

    onUpdate.call(this, todo.id, finalValue);
    setValueToUpdate(finalValue);
    todoTitleRef.current.textContent = todo.text;
  };

  const hideElement = ref => {
    ref.current.style.visibility = 'hidden';
  };

  const showElement = ref => {
    ref.current.style.visibility = 'visible';
  };

  const TABLET_WIDTH = 768;
  const isTabletVersion = () => {
    return window.innerWidth <= TABLET_WIDTH;
  };

  return (
    <div className={classes.TodoItem}>
      <label
        ref={checkboxRef}
        htmlFor={todo.id}
        className={classes.ToggleBlock}
      >
        <div
          className={checkboxClasses.join(' ')}
          onClick={onToggle.bind(this, todo.id)}
        ></div>
      </label>

      <div
        className={todoContentClasses.join(' ')}
        title="Double click to edit"
        onDoubleClick={startTodoEditing}
        onContextMenu={e => {
          e.preventDefault();
          onTodoPinning.call(this, todo.id);
        }}
        onTouchEnd={() => onTodoPinning.call(this, todo.id)}
      >
        <span
          ref={todoTitleRef}
          className={todo.isCompleted ? classes.Completed : ''}
        >
          {todo.text}
        </span>

        {/* input for edit todo */}
        <input
          ref={inputRef}
          type="text"
          className={classes.inputForEdit}
          value={valueToUpdate}
          onChange={e => {
            setValueToUpdate(e.target.value);
            // set short value (for displaying input with small height)
            todoTitleRef.current.textContent = '1';
          }}
          onBlur={endTodoEditing}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              e.target.blur();
            }

            if (e.key === 'Escape') {
              inputRef.current.style.display = 'none';
              needToUpdate = false;
            }
          }}
        />
      </div>
      <div className={classes.actions}>
        <div
          className={classes.removeBtn}
          onClick={onRemove.bind(this, todo.id)}
        ></div>
        {isTabletVersion() ? (
          <div className={classes.editBtn} onClick={startTodoEditing}></div>
        ) : null}
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdate: (todoId, newTitle) =>
      dispatch(dispatchChangeTodoTitle(todoId, newTitle)),
    onToggle: todoId => dispatch(dispatchToggleTodo(todoId)),
    onRemove: todoId => dispatch(dispatchDeleteTodo(todoId)),
    onTodoPinning: todoId => dispatch(disptachPinTodo(todoId))
  };
}

TodoItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isPinned: PropTypes.bool.isRequired
  }),

  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onTodoPinning: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(TodoItem);
