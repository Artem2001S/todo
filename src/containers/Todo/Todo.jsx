import React, { useState } from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import AddForm from '../../components/AddForm/AddForm'
import TodoList from '../../components/TodoList/TodoList'

export default function Todo() {
  const [todos, setTodos] = useState([{ id: 1, text: 'todo1', isCompleted: false }, { id: 2, text: 'todo2', isCompleted: true }]);

  const addTodo = (text) => {
    const newTodos = [createTodoObject(text), ...todos];
    setTodos(newTodos);
  }

  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm sumbitHandler={addTodo} />
      <TodoList todos={todos} />
    </div>
  )
}

const createTodoObject = (text) => {
  return {
    id: new Date().valueOf(),
    text: text,
    isCompleted: false
  }
}
