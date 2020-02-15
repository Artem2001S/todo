import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodoList from 'components/TodoList/TodoList';
import { filter } from 'utils.js';
import {
  dispatchToggleTodo,
  dispatchDeleteTodo,
  dispatchPinTodo,
  dispatchChangeTodoTitle
} from 'redux/actions/actions';

const mapStateToProps = state => ({
  todoList: filter(state.todos, state.filter)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handleTodoToggle: dispatchToggleTodo,
      handleRemoveTodo: dispatchDeleteTodo,
      handlePinTodo: dispatchPinTodo,
      handleChangeTodoTitle: dispatchChangeTodoTitle
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
