import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import classes from './TodoList.module.scss'

export default function TodoList({ todos, onToggle }) {
  const $todos = todos.map((todo, index) => {
    return (<TodoItem key={`${index}a`} todo={todo} onToggle={onToggle} />)
  });

  return (
    <div className={classes.TodoList}>
      {$todos}
    </div>
  )
}
