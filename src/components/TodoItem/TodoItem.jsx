import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './TodoItem.module.scss';
import { dispatchChangeTodoTitle, dispatchToggleTodo, dispatchDeleteTodo } from '../../redux/actions/actions';

function TodoItem({ todo, onToggle, onRemove, onUpdate }) {
  const inputRef = React.createRef();
  const checkboxRef = React.createRef();
  const todoTitleRef = React.createRef();

  const [valueToUpdate, setValueToUpdate] = useState(todo.text);
  let needToUpdate = true;

  const checkboxClasses = [classes.checkboxToggle];
  if (todo.isCompleted) { checkboxClasses.push(classes.Active); }
  return (
    <div className={classes.TodoItem}>
      <label ref={checkboxRef} htmlFor={todo.id} className={classes.ToggleBlock}>
        <div className={checkboxClasses.join(' ')} onClick={onToggle.bind(this, todo.id)}></div>
      </label>

      <div className={classes.ContentBlock} title="Double click to edit"
        onDoubleClick={
          () => {
            inputRef.current.style.display = 'block';
            hideElement(checkboxRef);
            console.log(checkboxRef.current);
            
            inputRef.current.focus();

            // set short value (for displaying input with small height)
            todoTitleRef.current.textContent = '1';
          }
        }>

        <span ref={todoTitleRef} className={todo.isCompleted ? classes.Completed : ''}>
          {todo.text}
        </span>

        {/* input for edit todo */}
        <input ref={inputRef} type="text" className={classes.inputForEdit} value={valueToUpdate}
          onChange={(e) => { setValueToUpdate(e.target.value); }}

          onBlur={
            () => {
              showElement(checkboxRef);
              inputRef.current.style.display = 'none';
              const finalValue = (needToUpdate ? valueToUpdate : todo.text).trim();

              onUpdate.call(this, todo.id, finalValue);
              setValueToUpdate(finalValue);
              todoTitleRef.current.textContent = todo.text;
            }
          }

          onKeyUp={
            (e) => {
              if (e.key === 'Enter') { e.target.blur(); }
              if (e.key === 'Escape') { inputRef.current.style.display = 'none'; needToUpdate = false; }
            }
          }
        />
      </div>
      <div className={classes.removeBtn} onClick={onRemove.bind(this, todo.id)}></div>
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdate: (todoId, newTitle) => dispatch(dispatchChangeTodoTitle(todoId, newTitle)),
    onToggle: (todoId) => dispatch(dispatchToggleTodo(todoId)),
    onRemove: (todoId) => dispatch(dispatchDeleteTodo(todoId)),
  }
}

export default connect(null, mapDispatchToProps)(TodoItem);

function hideElement(ref) {
  ref.current.style.visibility = 'hidden';
}

function showElement(ref) {
  ref.current.style.visibility = 'visible';
}
