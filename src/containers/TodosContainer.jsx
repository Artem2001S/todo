import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Todos from 'components/Todos/Todos';
import * as actions from 'redux/actions/actions';
import { filter } from 'utils.js';

const mapStateToProps = state => ({
  visibleTodoList: filter(state.todos, state.filter),
  todoList: state.todos,
  selectedDate: state.filter.selectedDate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      removeCompleted: actions.deleteCompletedTodos,
      handleToggleAll: actions.toggleAllTodos,
      handleAddTodo: actions.addTodo,
      handleTodoToggle: actions.toggleTodo,
      handleRemoveTodo: actions.deleteTodo,
      handleToggleUrgent: actions.toggleUrgentTodo,
      setTodo: actions.setTodo,
      handlePinTodo: actions.pinTodo,
      handleSetDate: actions.setDate,
      handleChangeTodoTitle: actions.changeTodoTitle
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
