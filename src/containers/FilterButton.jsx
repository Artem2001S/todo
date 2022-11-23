import { connect } from 'react-redux';
import { applyFilter } from 'redux/actions/actions';
import Button from 'components/UI/Button/Button';

const mapStateToProps = (state, props) => ({
  isActive: state.filter.filterType === props.filter
});

const mapDispatchToProps = (dispatch, props, d) => ({
  onClick: () => {
    dispatch(applyFilter(props.isActive ? 'none' : props.filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
