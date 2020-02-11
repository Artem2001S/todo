import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';

function TodoList({ filteredTodos }) {
  return (
    <div className={classes.TodoList}>
      {filteredTodos.map(todo => (
        <TodoItem key={`${todo.id}a`} todo={todo} />
      ))}
    </div>
  );
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
