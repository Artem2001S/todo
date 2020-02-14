import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';

export default function TodoList({ todoList, ...todoActions }) {
  return (
    <div className={classes.TodoList}>
      {todoList.map(todo => (
        <TodoItem key={`${todo.id}a`} todo={todo} {...todoActions} />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired
};
