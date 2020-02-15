import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from 'components/Header/Header';
import AddForm from 'components/AddForm/AddForm';
import Filters from 'components/Filters/Filters';
import Button from 'components/UI/Button/Button';
import ProgressIndicator from 'components/UI/ProgressIndicator/ProgressIndicator';
import StatusBar from 'components/StatusBar/StatusBar';
import {
  dispatchDeleteCompletedTodos,
  dispatchAddTodo,
  dispatchToggleAllTodos
} from 'redux/actions/actions';
import { bindActionCreators } from 'redux';
import {
  getCompletedTodosCount,
  getStatusBarContent,
  getCompletedPercent
} from 'utils';

function TodoAppHeader(props) {
  const { removeCompleted, todos, handleToggleAll, handleAddTodo } = props;

  const todosLength = todos.length;
  const isEmpty = todosLength === 0;

  const completedTodosCount = getCompletedTodosCount(todos);
  const statusBarContent = getStatusBarContent(todos);
  const completedPercent = getCompletedPercent(todos);

  return (
    <div>
      <Header headerContent={'To do list'} />
      <AddForm
        isToggleBtnActive={completedTodosCount === todosLength}
        isEmpty={isEmpty}
        onToggleAll={handleToggleAll}
        submitHandler={handleAddTodo}
      />
      {!isEmpty && (
        <>
          <div className={/*classes.TodosHeader*/ ''}>
            <StatusBar statusText={statusBarContent} />
            <Filters />
          </div>
          <ProgressIndicator progressValue={completedPercent} />
        </>
      )}

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
    completedPercent: state.todos.completedPercent
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCompleted: dispatchDeleteCompletedTodos,
      handleAddTodo: dispatchAddTodo,
      handleToggleAll: dispatchToggleAllTodos
    },
    dispatch
  );

TodoAppHeader.propTypes = {
  todos: PropTypes.array.isRequired,
  removeCompleted: PropTypes.func.isRequired,
  handleAddTodo: PropTypes.func.isRequired,
  handleToggleAll: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoAppHeader);
