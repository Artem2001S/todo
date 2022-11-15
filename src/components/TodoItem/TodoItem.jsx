import React, { useState, useEffect, useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UIParametersContext } from 'Contexts/UIParametersContext';
import classes from './TodoItem.module.scss';
import Checkbox from 'components/UI/Checkbox/Checkbox';
import { format } from 'date-fns';
import sound from './icq.mp3';

export default function TodoItem({
  todo,
  handleTodoToggle,
  handleRemoveTodo,
  handleChangeTodoTitle,
  handlePinTodo
}) {
  const inputRef = React.createRef();
  const [enterAuthor, setEnterAuthor] = useState(false);
  const [authorName, setAuthorName] = useState(todo.authorName);
  const { isTabletVersion } = useContext(UIParametersContext);
  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const removeTodo = useCallback(() => handleRemoveTodo(todo.id), [
    todo.id,
    handleRemoveTodo
  ]);

  const toggleTodo = useCallback(() => {
    const audio = new Audio(sound);
    if (todo.isCompleted) {
      handleTodoToggle(todo.id);
      audio.play();
    } else {
      if (enterAuthor) {
        handleTodoToggle(todo.id, authorName, new Date().valueOf());
        setEnterAuthor(false);
        audio.play();
      } else {
        setEnterAuthor(true);
      }
    }
  }, [todo.isCompleted, todo.id, handleTodoToggle, enterAuthor, authorName]);

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
    spanClasses: classNames(classes.title, {
      [classes.Completed]: todo.isCompleted
    })
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

  return (
    <>
      <div className={classes.TodoItem}>
        <div className={calculatedClasses.toggleBlockClasses}>
          <Checkbox
            isChecked={todo.isCompleted}
            type={todo.isPinned && 'pink'}
            onCheckboxChanged={toggleTodo}
          />
        </div>

        <div
          className={classNames(classes.root, {
            [classes.white]: enterAuthor
          })}
        >
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
            {!isEditingMode && (
              <b className={classes.titleDate}>
                {format(todo.createdAt, 'dd.MM в HH:mm')}
              </b>
            )}

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
              <button className={classes.removeBtn} onClick={removeTodo} />
              {isTabletVersion && (
                <button
                  className={classes.editBtn}
                  onClick={startTodoEditing}
                />
              )}
            </div>
          )}
          <div
            className={classNames({
              [classes.bottom]: todo.isCompleted || enterAuthor
            })}
          >
            {!enterAuthor ? (
              todo.isCompleted && (
                <div className={classes.createdTitle}>
                  {todo.authorName && (
                    <div>
                      Выполнил: {todo.authorName}
                      {todo.completedDate && (
                        <b>, {format(todo.completedDate, 'dd.MM в HH:mm')}</b>
                      )}
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className={classes.editAuthorRoot}>
                <input
                  autoFocus={true}
                  value={authorName}
                  className={classes.authorInput}
                  placeholder="Кто выполнил"
                  onChange={e => {
                    setAuthorName(e.target.value);
                  }}
                  onKeyUp={e => {
                    if (e.key === 'Enter') {
                      toggleTodo();
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.exact({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    isPinned: PropTypes.bool.isRequired,
    createdAt: PropTypes.number,
    authorName: PropTypes.string,
    completedDate: PropTypes.number
  }),

  handleTodoToggle: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleChangeTodoTitle: PropTypes.func.isRequired,
  handlePinTodo: PropTypes.func.isRequired
};
