import React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';

function TodoList({ todos }) {
  const $todos = todos.map((todo) => {
    return (<TodoItem key={`${todo.id}a`} todo={todo} isCompleted={todo.isCompleted} />)
  });

  return (
    <div className={classes.TodoList}>
      {$todos}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps)(TodoList);
