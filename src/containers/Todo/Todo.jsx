import React from 'react';
import { connect } from 'react-redux';
import classes from './Todo.module.css';
import Header from '../../components/Header/Header';
import AddForm from '../../components/AddForm/AddForm';
import TodoList from '../../components/TodoList/TodoList';
import Filters from '../../components/Filters/Filters';
import Button from '../../components/UI/Button/Button';
import ProgressIndicator from '../../components/UI/ProgressIndicator/ProgressIndicator';
import StatusBar from '../../components/StatusBar/StatusBar';
import { dispatchDeleteCompletedTodos } from '../../redux/actions/actions';

function Todo(props) {
  const { removeCompleted, todosRedux, completedTodosCount, statusBarContnet, completedPercent } = props;

  const todosLength = todosRedux.length;
  const isEmpty = todosLength === 0;

  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm isToggleBtnActive={completedTodosCount === todosLength} isEmpty={isEmpty} />
      {
        isEmpty ? null :
          <>
            <div className={classes.TodosHeader}>
              <StatusBar statusText={statusBarContnet} />
              <Filters />
            </div>
            <ProgressIndicator progressValue={completedPercent} />
          </>
      }

      <TodoList />

      {completedTodosCount > 0 ? <Button type={'transparent'} onClick={removeCompleted}>Clear completed</Button> : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    todosRedux: state.todos,
    completedTodosCount: state.completedTodosCount,
    statusBarContnet: state.statusBarContnet,
    completedPercent: state.completedPercent,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeCompleted: () => dispatch(dispatchDeleteCompletedTodos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
