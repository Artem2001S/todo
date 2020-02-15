import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todos from 'components/Todos/Todos';
import * as actions from 'redux/actions/actions';
import { filter } from 'utils.js';

const mapStateToProps = state => ({
  visibleTodoList: filter(state.todos, state.filter),
  todoList: state.todos
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCompleted: actions.dispatchDeleteCompletedTodos,
      handleToggleAll: actions.dispatchToggleAllTodos,
      handleAddTodo: actions.dispatchAddTodo,
      handleTodoToggle: actions.dispatchToggleTodo,
      handleRemoveTodo: actions.dispatchDeleteTodo,
      handlePinTodo: actions.dispatchPinTodo,
      handleChangeTodoTitle: actions.dispatchChangeTodoTitle
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
