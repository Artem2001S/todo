import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import classes from './TodoList.module.scss';
import TodoModal from 'components/TodoModal';

export default function TodoList({ todoList, ...todoActions }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState();

  const openModal = todo => {
    setIsModalOpened(true);
    setSelectedTodo(todo);
  };

  return (
    <div className={classes.TodoList}>
      {todoList.map(todo => (
        <TodoItem
          openModal={openModal}
          key={`${todo.id}a`}
          todo={todo}
          {...todoActions}
        />
      ))}
      <TodoModal
        onSave={todoActions.setTodo}
        close={() => setIsModalOpened(false)}
        todo={selectedTodo}
        isOpen={isModalOpened}
      />
    </div>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array.isRequired
};
