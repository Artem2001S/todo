import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Todo.module.css'
import Header from '../../components/Header/Header'
import AddForm from '../../components/AddForm/AddForm'
import TodoList from '../../components/TodoList/TodoList'
import Filters from '../../components/Filters/Filters'
import Button from '../../components/UI/Button/Button'
import ProgressIndicator from '../../components/UI/ProgressIndicator/ProgressIndicator'
import StatusBar from '../../components/StatusBar/StatusBar'
import { dispatchDeleteCompletedTodos, dispatchToggleAllTodos } from '../../redux/actions/actions'

function Todo(props) {
  const { removeCompleted, todosRedux, completedTodosCount, statusBarContnet, completedPercent } = props;

  const LOCAL_STORAGE_KEY_TODOS = 'todos';
  const LOCAL_STORAGE_KEY_FILTER = 'activeFilter';

  const [todos, setTodos] = useState([]);

  const initialFilter = localStorage.getItem(LOCAL_STORAGE_KEY_FILTER) || 'all';
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const changeFilter = (filter) => {
    setActiveFilter(filter);
  }

  const filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.isCompleted);
      case 'completed':
        return items.filter((item) => item.isCompleted);
      default:
        return items;
    }
  }


  const visibleTodos = filter(todos, activeFilter);
  const todosLength = todosRedux.length;

  const isEmpty = todosLength === 0;
  const completedCount = completedTodosCount;
  
  return (
    <div className={classes.TodoContainer}>
      <Header headerContent={'To do list'} />
      <AddForm isToggleBtnActive={completedCount === todosLength} isEmpty={isEmpty} />
      {
        isEmpty ? null :
          <>
            <div className={classes.TodosHeader}>
              <StatusBar statusText={statusBarContnet} />
              <Filters activeFilter={activeFilter} onClickHandler={changeFilter} />
            </div>
            <ProgressIndicator progressValue={completedPercent} />
          </>
      }

      <TodoList />

      {completedCount > 0 ? <Button type={'transparent'} onClick={removeCompleted}>Clear completed</Button> : null}
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
