import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import classes from './TodoItem.module.scss';
import {
  dispatchChangeTodoTitle,
  dispatchToggleTodo,
  dispatchDeleteTodo,
  disptachPinTodo
} from 'redux/actions/actions';
import Checkbox from 'components/UI/Checkbox/Checkbox';

function TodoItem({ todo, onToggle, onRemove, onUpdate, onTodoPinning }) {
  const inputRef = React.createRef();

  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const toggleBlockClasses = classNames(classes.ToggleBlock, {
    [classes.hided]: isEditingMode
  });

  const todoContentClasses = classNames(classes.ContentBlock, {
    [classes.Pinned]: todo.isPinned
  });

  const inputClasses = classNames(classes.inputForEdit, {
    [classes.hided]: !isEditingMode
  });

  const spanClasses = classNames({ [classes.Completed]: todo.isCompleted });

  const startTodoEditing = () => {
    setIsEditingMode(true);
  };

  const endTodoEditing = () => {
    // if zero-value then delete todo, else update todo
    if (!valueToUpdate) {
      onRemove(todo.id);
      return;
    }

    if (valueToUpdate !== todo.text) {
      onUpdate(todo.id, valueToUpdate);
    }

    setIsEditingMode(false);
  };

  const TABLET_WIDTH = 768;
  const isTabletVersion = () => {
    return window.innerWidth <= TABLET_WIDTH;
  };

  return (
    <div className={classes.TodoItem}>
      <div className={toggleBlockClasses}>
        <Checkbox
          isChecked={todo.isCompleted}
          onCheckboxChanged={onToggle.bind(this, todo.id)}
          type={todo.isPinned && 'pink'}
        />
      </div>

      <div
        className={todoContentClasses}
        title="Double click to edit"
        onDoubleClick={startTodoEditing}
        onContextMenu={e => {
          e.preventDefault();
          onTodoPinning(todo.id);
        }}
        onTouchEnd={() => onTodoPinning(todo.id)}
      >
        <span className={spanClasses}>{isEditingMode ? '1' : todo.text}</span>

        {/* input for edit todo */}
        <input
          ref={inputRef}
          type="text"
          className={inputClasses}
          value={valueToUpdate}
          onChange={e => {
            setValueToUpdate(e.target.value);
          }}
          onBlur={endTodoEditing}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              e.target.blur();
            }

            if (e.key === 'Escape') {
              setValueToUpdate(todo.text);
              setIsEditingMode(false);
            }
          }}
        />
      </div>
      {isEditingMode || (
        <div className={classes.actions}>
          <button
            className={classes.removeBtn}
            onClick={onRemove.bind(this, todo.id)}
          />

          {isTabletVersion() && (
            <button className={classes.editBtn} onClick={startTodoEditing} />
          )}
        </div>
      )}
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
