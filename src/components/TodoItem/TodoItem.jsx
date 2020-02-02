import React from 'react'
import classes from './TodoItem.module.scss'

export default function TodoItem({ todo }) {
  const rnd = Math.random();

  const inputRef = React.createRef();

  return (
    <div className={classes.TodoItem}>

      <label htmlFor={rnd} className={classes.ToggleBlock}>
        <input type="checkbox" id={rnd} onChange={() => console.log('toggle')} />
        <div className={classes.checkboxToggle}></div>
      </label>

      <div
        className={classes.ContentBlock}
        title="Double click to edit"
        onDoubleClick={() => { inputRef.current.style.display = 'block'; inputRef.current.focus() }}
      >
        <span className={todo.isCompleted ? classes.Completed : ''}>
          {todo.text}
        </span>
        <input ref={inputRef} type="text" className={classes.inputForEdit} />
      </div>
      <div className={classes.removeBtn}></div>
    </div>
  )
}
