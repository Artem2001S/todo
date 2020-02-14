import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UIParametersContext } from 'Contexts/UIParametersContext';
import classes from './TodoItem.module.scss';
import Checkbox from 'components/UI/Checkbox/Checkbox';

export default function TodoItem({
  todo,
  handleTodoToggle,
  handleRemoveTodo,
  handleChangeTodoTitle,
  handlePinTodo
}) {
  const inputRef = React.createRef();

  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  const [isEditingMode, setIsEditingMode] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const calculatedClasses = {
    toggleBlockClasses: classNames(classes.ToggleBlock, {
      [classes.hided]: isEditingMode
    }),
    todoContentClasses: classNames(classes.ContentBlock, {
      [classes.Pinned]: todo.isPinned
    }),
    inputClasses: classNames(classes.inputForEdit, {
      [classes.hided]: !isEditingMode
    }),
    spanClasses: classNames({ [classes.Completed]: todo.isCompleted })
  };

  const startTodoEditing = () => {
    setIsEditingMode(true);
  };

  const endTodoEditing = () => {
    // if zero-value then delete todo, else update todo
    if (!valueToUpdate.trim()) {
      handleRemoveTodo(todo.id);
      return;
    }

    if (valueToUpdate !== todo.text) {
      handleChangeTodoTitle(todo.id, valueToUpdate);
    }

    setIsEditingMode(false);
  };

  const { isTabletVersion } = useContext(UIParametersContext);

  return (
    <div className={classes.TodoItem}>
      <div className={calculatedClasses.toggleBlockClasses}>
        <Checkbox
          isChecked={todo.isCompleted}
          onCheckboxChanged={handleTodoToggle.bind(this, todo.id)}
          type={todo.isPinned && 'pink'}
        />
      </div>

      <div
        className={calculatedClasses.todoContentClasses}
        title="Double click to edit"
        onDoubleClick={startTodoEditing}
        onContextMenu={e => {
          e.preventDefault();
          handlePinTodo(todo.id);
        }}
        onTouchEnd={() => handlePinTodo(todo.id)}
      >
        <span className={calculatedClasses.spanClasses}>
          {isEditingMode ? '1' : todo.text}
        </span>

        {/* input for edit todo */}
        <input
          ref={inputRef}
          type="text"
          className={calculatedClasses.inputClasses}
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
            onClick={handleRemoveTodo.bind(this, todo.id)}
          />

          {isTabletVersion && (
            <button className={classes.editBtn} onClick={startTodoEditing} />
          )}
        </div>
      )}
    </div>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isPinned: PropTypes.bool.isRequired
  }),

  handleTodoToggle: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleChangeTodoTitle: PropTypes.func.isRequired,
  handlePinTodo: PropTypes.func.isRequired
};
