import React, { useState } from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import AddForm from '../../components/AddForm/AddForm'
import TodoList from '../../components/TodoList/TodoList'

export default function Todo() {
  const [todos, setTodos] = useState([{ id: 321, text: 'todo1', isCompleted: false }, { id: 123122, text: 'todo2', isCompleted: true }]);

  const addTodo = (text) => {
    setTodos([createTodoObject(text), ...todos]);
  }

  const todoToggle = (todoId) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === todoId);
    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  }

  const removeTodo = (todoId) => {
    const newTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(newTodos);
  }

  const updateTodoText = (todoId, text) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === todoId);
    newTodos[index].text = text;

    setTodos(newTodos);
  }

  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm sumbitHandler={addTodo} />
      <TodoList todos={todos} onToggle={todoToggle} onRemove={removeTodo} onUpdate={updateTodoText} />
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
