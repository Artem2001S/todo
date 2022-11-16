import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { UIParametersContext } from 'Contexts/UIParametersContext';
import classes from './TodoItem.module.scss';
import { getTrackBackground, Range } from 'react-range';

import Checkbox from 'components/UI/Checkbox/Checkbox';
import { format } from 'date-fns';
import sound from './icq.mp3';
import { debounce } from 'lodash';
import { addOrSetTodo, removeTodoFb } from 'firebaseHelpers';

function makeDoubleClick(doubleClickCallback, singleClickCallback) {
  var clicks = 0,
    timeout;
  return function() {
    clicks++;
    if (clicks === 1) {
      timeout = setTimeout(function() {
        singleClickCallback && singleClickCallback.apply(this, arguments);
        clicks = 0;
      }, 300);
    } else {
      timeout && clearTimeout(timeout);
      doubleClickCallback && doubleClickCallback.apply(this, arguments);
      clicks = 0;
    }
  };
}

export default function TodoItem({
  todo,
  openModal,
  handleTodoToggle,
  handleRemoveTodo,
  handleChangeTodoTitle,
  handlePinTodo,
  handleToggleUrgent
}) {
  const inputRef = React.createRef();
  const [enterAuthor, setEnterAuthor] = useState(false);
  const [authorName, setAuthorName] = useState(todo.authorName);
  const { isTabletVersion } = useContext(UIParametersContext);
  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  const [isEditingMode, setIsEditingMode] = useState(false);

  const removeTodo = useCallback(() => {
    removeTodoFb(todo.id);
    // handleRemoveTodo(todo.id);
  }, [todo.id]);

  const [progressValues, setProgressValues] = useState([todo.progress || 0]);
  const toggleUrgent = useCallback(() => {
    addOrSetTodo({ ...todo, isUrgent: !todo.isUrgent });
  }, [todo]);

  const debouncedUpdateProgress = useMemo(
    () =>
      debounce(value => {
        addOrSetTodo({ ...todo, progress: value });
      }, 450),
    [todo]
  );

  useEffect(() => {
    debouncedUpdateProgress(progressValues[0]);
    return () => {
      debouncedUpdateProgress.cancel();
    };
  }, [debouncedUpdateProgress, progressValues]);

  const toggleTodo = useCallback(() => {
    const audio = new Audio(sound);
    if (todo.isCompleted) {
      // handleTodoToggle(todo.id);
      addOrSetTodo({ ...todo, isCompleted: !todo.isCompleted });
      audio.play();
    } else {
      if (enterAuthor) {
        // handleTodoToggle(todo.id, authorName, new Date().valueOf());
        addOrSetTodo({
          ...todo,
          isCompleted: !todo.isCompleted,
          authorName,
          completedDate: new Date().valueOf()
        });

        setEnterAuthor(false);
        audio.play();
      } else {
        setEnterAuthor(true);
      }
    }
  }, [todo, enterAuthor, authorName]);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const calculatedClasses = {
    toggleBlockClasses: classNames(classes.ToggleBlock, {
      [classes.hided]: isEditingMode
    }),
    todoContentClasses: classNames(classes.ContentBlock, {
      [classes.Pinned]: todo.isPinned,
      [classes.urgent]: todo.isUrgent,
      [classes.completedBlock]: todo.isCompleted
    }),
    inputClasses: classNames(classes.inputForEdit, {
      [classes.hided]: !isEditingMode
    }),
    spanClasses: classNames(classes.title, {
      [classes.urgentSpan]: todo.isUrgent,
      [classes.Completed]: todo.isCompleted
    })
  };

  const startTodoEditing = () => {
    setIsEditingMode(true);
  };

  const endTodoEditing = () => {
    // if zero-value then delete todo, else update todo
    if (!valueToUpdate.trim()) {
      removeTodo();
      // handleRemoveTodo(todo.id);
      return;
    }

    if (valueToUpdate !== todo.text) {
      // handleChangeTodoTitle(todo.id, valueToUpdate);
      addOrSetTodo({ ...todo, text: valueToUpdate });
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
            onClick={makeDoubleClick(startTodoEditing, () => {
              !isEditingMode && openModal(todo);
            })}
            onContextMenu={e => {
              e.preventDefault();
              addOrSetTodo({ ...todo, isPinned: !todo.isPinned });
            }}
            // onTouchEnd={() => handlePinTodo(todo.id)}
          >
            <span className={calculatedClasses.spanClasses}>
              {isEditingMode ? '1' : todo.text}
            </span>
            {!isEditingMode && (
              <b
                className={classNames(classes.titleDate, {
                  [classes.urgentSpan]: todo.isUrgent,
                  [classes.Completed]: todo.isCompleted
                })}
              >
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
              <button
                className={classNames(classes.removeBtn, {
                  [classes.removeBtnUrgent]: todo.isUrgent || todo.isCompleted
                })}
                onClick={removeTodo}
              />
              {!todo.isCompleted && (
                <div className={classes.urgentBtn} onClick={toggleUrgent}>
                  <img
                    className={classes.urgentIcon}
                    src={require('./alarm.png')}
                    alt="img"
                  />
                </div>
              )}
              {isTabletVersion && (
                <button
                  className={classes.editBtn}
                  onClick={startTodoEditing}
                />
              )}
            </div>
          )}
          <div
            className={classNames(classes.bottom, {
              [classes.bottom]: enterAuthor
            })}
          >
            {!enterAuthor ? (
              todo.isCompleted ? (
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
              ) : (
                <>
                  <Range
                    step={1}
                    min={0}
                    max={100}
                    values={progressValues}
                    onChange={values => setProgressValues(values)}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '15px',
                          width: '100%',
                          borderRadius: '10px',
                          background: getTrackBackground({
                            values: progressValues,
                            colors: ['crimson', '#fff'],
                            min: 0,
                            max: 100
                          })
                        }}
                      >
                        {children}
                      </div>
                    )}
                    renderThumb={({ props }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: '30px',
                          borderRadius: '20px',
                          outline: 'none',

                          width: '30px',
                          backgroundColor: 'crimson'
                        }}
                      />
                    )}
                  />
                </>
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
    completedDate: PropTypes.number,
    isUrgent: PropTypes.bool,
    progress: PropTypes.number,
    comment: PropTypes.string
  }),

  handleTodoToggle: PropTypes.func.isRequired,
  handleRemoveTodo: PropTypes.func.isRequired,
  handleChangeTodoTitle: PropTypes.func.isRequired,
  handlePinTodo: PropTypes.func.isRequired
};
