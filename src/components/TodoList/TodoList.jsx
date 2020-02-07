import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';

function TodoList({ filteredTodos }) {
  const $todos = filteredTodos.map(todo => {
    return (
      <TodoItem
        key={`${todo.id}a`}
        todo={todo}
        isCompleted={todo.isCompleted}
        isPinned={todo.isPinned}
      />
    );
  });

  return <div className={classes.TodoList}>{$todos}</div>;
}

function mapStateToProps(state) {
  return {
    filteredTodos: state.filteredTodos
  };
}

TodoList.propTypes = {
  filteredTodos: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(TodoList);
