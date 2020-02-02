import React from 'react'
import TodoItem from '../TodoItem/TodoItem'
import classes from './TodoList.module.scss'

export default function TodoList() {
  return (
    <div className={classes.TodoList}>
      <TodoItem />
      <TodoItem />
    </div>
  )
}
