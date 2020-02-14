import { connect } from 'react-redux';
import { dispatchApplyFilter } from 'redux/actions/actions';
import Button from 'components/UI/Button/Button';

const mapStateToProps = (state, props) => ({
  isActive: state.filter === props.filter
});

const mapDispatchToProps = (dispatch, props) => ({
  onClick: () => dispatch(dispatchApplyFilter(props.filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
