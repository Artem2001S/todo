import React, { useState, useEffect } from 'react'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import AddForm from '../../components/AddForm/AddForm'
import TodoList from '../../components/TodoList/TodoList'
import Filters from '../../components/Filters/Filters'
import Button from '../../components/UI/Button/Button'
import ProgressIndicator from '../../components/UI/ProgressIndicator/ProgressIndicator'
import StatusBar from '../../components/StatusBar/StatusBar'

export default function Todo() {
  const LOCAL_STORAGE_KEY_TODOS = 'todos';
  const LOCAL_STORAGE_KEY_FILTER = 'activeFilter';

  const [todos, setTodos] = useState([]);

  const initialFilter = localStorage.getItem(LOCAL_STORAGE_KEY_FILTER) || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  useEffect(() => {
    const todosFromStorage = localStorage.getItem(LOCAL_STORAGE_KEY_TODOS) || '[]';
    setTodos(JSON.parse(todosFromStorage));
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TODOS, JSON.stringify(todos));
    localStorage.setItem(LOCAL_STORAGE_KEY_FILTER, activeFilter);
  }, [todos, activeFilter])

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

  const removeCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  }

  const updateTodoText = (todoId, text) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex((todo) => todo.id === todoId);
    newTodos[index].text = text;

    setTodos(newTodos);
  }

  const changeFilter = (filter) => {
    setActiveFilter(filter);
  }

  const toggleAllTodos = () => {
    let newTodos = [...todos];
    if (newTodos.length === getCompletedTodosCount()) {
      newTodos = newTodos.map((todo) => { return { ...todo, isCompleted: false } });
    } else {
      newTodos = newTodos.map((todo) => { return { ...todo, isCompleted: true } });
    }

    setTodos(newTodos);
  }

  const filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.isCompleted);
      case 'completed':
        return items.filter((item) => item.isCompleted);
      default:
        return items;
    }
  }

  const getCompletedTodosCount = () => {
    return todos.reduce((accum, todo) => {
      if (todo.isCompleted) return accum + 1;
      return accum;
    }, 0);
  }

  const getCompletedPercent = () => {
    const all = todos.length;
    const percent = (getCompletedTodosCount() * 100) / all;
    return Math.round(percent);
  }

  const visibleTodos = filter(todos, activeFilter);

  const isEmpty = todos.length === 0;
  const completedCount = getCompletedTodosCount();


  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm sumbitHandler={addTodo} onToggleAll={toggleAllTodos} isToggleBtnActive={completedCount === todos.length} isEmpty={isEmpty} />
      {
        isEmpty ? null :
          <>
            <div className={classes.TodosHeader}>
              <StatusBar />
              <Filters activeFilter={activeFilter} onClickHandler={changeFilter} />
            </div>
            <ProgressIndicator progressValue={getCompletedPercent()} />
          </>
      }

      <TodoList todos={visibleTodos} onToggle={todoToggle} onRemove={removeTodo} onUpdate={updateTodoText} />

      {completedCount > 0 ? <Button type={'transparent'} onClick={removeCompleted}>Clear completed</Button> : null}
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
