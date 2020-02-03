import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import classes from './TodoList.module.scss'

export default function TodoList({ todos, onToggle, onRemove, onUpdate }) {
  const $todos = todos.map((todo) => {
    return (<TodoItem key={`${todo.id}a`} todo={todo} onToggle={onToggle} onRemove={onRemove} onUpdate={onUpdate} />)
  });

  return (
    <div className={classes.TodoList}>
      {$todos}
    </div>
  )
}
