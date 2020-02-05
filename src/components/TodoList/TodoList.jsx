import React from 'react';
import { connect } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';
import { dispatchToggleTodo, dispatchDeleteTodo } from '../../redux/actions/actions';

function TodoList({ todos, onToggle, onRemove, onUpdate }) {
  const $todos = todos.map((todo) => {
    return (<TodoItem key={`${todo.id}a`} todo={todo} onToggle={onToggle} onRemove={onRemove} onUpdate={onUpdate} />)
  });

  return (
    <div className={classes.TodoList}>
      {$todos}
    </div>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    onToggle: (todoId) => dispatch(dispatchToggleTodo(todoId)),
    onRemove: (todoId) => dispatch(dispatchDeleteTodo(todoId)),
  }
}

export default connect(null, mapDispatchToProps)(TodoList);
