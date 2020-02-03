import React, { useState } from 'react'
import classes from './TodoItem.module.scss'

export default function TodoItem({ todo, onToggle, onRemove, onUpdate }) {
  const inputRef = React.createRef();
  const checkboxRef = React.createRef();

  const [valueToUpdate, setValueToUpdate] = useState(todo.text)
  let needToUpdate = true;

  return (
    <div className={classes.TodoItem}>
      <label ref={checkboxRef} htmlFor={todo.id} className={classes.ToggleBlock}>
        <input type="checkbox" id={todo.id} onChange={onToggle.bind(this, todo.id)} defaultChecked={todo.isCompleted} />
        <div className={classes.checkboxToggle}></div>
      </label>

      <div className={classes.ContentBlock} title="Double click to edit"
        onDoubleClick={() => { inputRef.current.style.display = 'block'; hideElement(checkboxRef); inputRef.current.focus(); }}>
        <span className={todo.isCompleted ? classes.Completed : ''}>
          {todo.text}
        </span>

        {/* input for edit todo */}
        <input ref={inputRef} type="text" className={classes.inputForEdit} value={valueToUpdate}
          onChange={(e) => { setValueToUpdate(e.target.value); }}

          onBlur={
            () => {
              showElement(checkboxRef);
              inputRef.current.style.display = 'none';
              const finalValue = needToUpdate ? valueToUpdate : todo.text;
              onUpdate.call(this, todo.id, finalValue);
              setValueToUpdate(finalValue.trim());
            }}

          onKeyUp={
            (e) => {
              if (e.key === 'Enter') { e.target.blur(); }
              if (e.key === 'Escape') { inputRef.current.style.display = 'none'; needToUpdate = false; }
            }
          } />
      </div>
      <div className={classes.removeBtn} onClick={onRemove.bind(this, todo.id)}></div>
    </div>
  )
}


function hideElement(ref) {
  ref.current.style.visibility = 'hidden';
}

function showElement(ref) {
  ref.current.style.visibility = 'visible';
}
