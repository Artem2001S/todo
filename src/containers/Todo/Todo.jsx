import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './Todo.module.scss';
import Header from 'components/Header/Header';
import AddForm from 'components/AddForm/AddForm';
import TodoList from 'components/TodoList/TodoList';
import Filters from 'components/Filters/Filters';
import Button from 'components/UI/Button/Button';
import ProgressIndicator from 'components/UI/ProgressIndicator/ProgressIndicator';
import StatusBar from 'components/StatusBar/StatusBar';
import {
  dispatchDeleteCompletedTodos,
  dispatchAddTodo,
  dispatchToggleAllTodos,
  dispatchToggleTodo,
  dispatchDeleteTodo,
  dispatchPinTodo,
  dispatchChangeTodoTitle
} from 'redux/actions/actions';
import { bindActionCreators } from 'redux';

function Todo(props) {
  const {
    removeCompleted,
    todos,
    completedTodosCount,
    statusBarContent,
    completedPercent,
    handleToggleAll,
    handleAddTodo,
    filteredTodos,
    ...todoActions
  } = props;

  const todosLength = todos.length;
  const isEmpty = todosLength === 0;

  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm
        isToggleBtnActive={completedTodosCount === todosLength}
        isEmpty={isEmpty}
        onToggleAll={handleToggleAll}
        submitHandler={handleAddTodo}
      />
      {isEmpty ? null : (
        <>
          <div className={classes.TodosHeader}>
            <StatusBar statusText={statusBarContent} />
            <Filters />
          </div>
          <ProgressIndicator progressValue={completedPercent} />
        </>
      )}

      <TodoList todoList={filteredTodos} {...todoActions} />

      {completedTodosCount > 0 && (
        <Button type={'transparent'} onClick={removeCompleted}>
          Clear completed
        </Button>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos.todoList,
    completedTodosCount: state.todos.completedTodosCount,
    statusBarContent: state.todos.statusBarContent,
    completedPercent: state.todos.completedPercent,
    filteredTodos: state.todos.filteredTodos
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCompleted: dispatchDeleteCompletedTodos,
      handleAddTodo: dispatchAddTodo,
      handleToggleAll: dispatchToggleAllTodos,
      handleTodoToggle: dispatchToggleTodo,
      handleRemoveTodo: dispatchDeleteTodo,
      handlePinTodo: dispatchPinTodo,
      handleChangeTodoTitle: dispatchChangeTodoTitle
    },
    dispatch
  );

Todo.propTypes = {
  todos: PropTypes.array.isRequired,
  filteredTodos: PropTypes.array.isRequired,
  completedTodosCount: PropTypes.number.isRequired,
  statusBarContent: PropTypes.string.isRequired,
  completedPercent: PropTypes.number.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
