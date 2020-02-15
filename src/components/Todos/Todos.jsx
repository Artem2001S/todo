import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header/Header';
import AddForm from 'components/AddForm/AddForm';
import Filters from 'components/Filters/Filters';
import Button from 'components/UI/Button/Button';
import ProgressIndicator from 'components/UI/ProgressIndicator/ProgressIndicator';
import StatusBar from 'components/StatusBar/StatusBar';
import * as utils from 'utils';
import classes from './Todos.module.scss';
import TodoList from 'components/TodoList/TodoList';

export default function Todos({
  todoList,
  visibleTodoList,
  removeCompleted,
  handleToggleAll,
  handleAddTodo,
  ...todoActions
}) {
  const todosLength = todoList.length;
  const isEmpty = todosLength === 0;

  const completedTodosCount = utils.getCompletedTodosCount(todoList);
  const statusBarContent = utils.getStatusBarContent(todoList);
  const completedPercent = utils.getCompletedPercent(todoList);

  return (
    <div className={classes.TodosContainer}>
      <Header headerContent={'To do list'} />
      <AddForm
        isToggleBtnActive={completedTodosCount === todosLength}
        isEmpty={isEmpty}
        onToggleAll={handleToggleAll}
        submitHandler={handleAddTodo}
      />
      {!isEmpty && (
        <>
          <div className={classes.TodosHeader}>
            <StatusBar statusText={statusBarContent} />
            <Filters />
          </div>
          <ProgressIndicator progressValue={completedPercent} />
        </>
      )}
      <TodoList todoList={visibleTodoList} {...todoActions} />
      {completedTodosCount > 0 && (
        <Button type={'transparent'} onClick={removeCompleted}>
          Clear completed
        </Button>
      )}
    </div>
  );
}

Todos.propTypes = {
  todoList: PropTypes.array.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired
};
