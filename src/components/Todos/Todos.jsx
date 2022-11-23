import React, { useEffect, useState } from 'react';
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
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import classNames from 'classnames';
import { removeTodoFb } from 'firebaseHelpers';

export default function Todos({
  todoList,
  selectedDate,
  visibleTodoList,
  removeCompleted,
  handleToggleAll,
  handleSetDate,
  handleAddTodo,
  ...todoActions
}) {
  const todosLength = todoList.length;
  const isEmpty = todosLength === 0;
  const [value, onChange] = useState(new Date());
  const location = useLocation();

  const isSettings = location.pathname === '/add';
  const history = useHistory();
  const completedTodosCount = utils.getCompletedTodosCount(todoList);
  const statusBarContent = utils.getStatusBarContent(todoList);
  const completedPercent = utils.getCompletedPercent(todoList);

  useEffect(() => {
    handleSetDate(value.valueOf());
  }, [handleSetDate, value]);

  return isSettings ? (
    <div className={classes.rootSettings}>
      <div
        className={classNames(classes.logoContainer, classes.center)}
        onClick={() => {
          history.push('/');
        }}
      >
        <img
          className={classes.logoIcon}
          src={require('./logo.png')}
          alt="logo"
        />
      </div>
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
      {completedTodosCount > 0 && (
        <Button
          type={'transparent'}
          onClick={() => {
            todoList.forEach(todo => {
              if (todo.isCompleted) {
                removeTodoFb(todo.id);
              }
            });
          }}
        >
          Удалить выполненные задачи
        </Button>
      )}
      <div className={classes.calendarWrapper}>
        {/* <Calendar value={value} onChange={onChange} /> */}
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <div
          className={classNames(classes.logoContainer, classes.logoAbsolute)}
          onClick={() => {
            history.push('/add');
          }}
        >
          <img
            className={classes.logoIcon}
            src={require('./logo.png')}
            alt="logo"
          />
        </div>
      </div>
      <div className={classes.TodosContainer}>
        <Header headerContent={format(selectedDate, 'dd.MM')} />
        <TodoList todoList={visibleTodoList} {...todoActions} />
      </div>
    </div>
  );
}

Todos.propTypes = {
  todoList: PropTypes.array.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired
};
