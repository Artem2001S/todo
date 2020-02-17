import { APPLY_FILTER } from 'redux/actions/actionTypes';

const initialState = 'all';

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_FILTER:
      return action.payload.newFilter;
    default:
      return state;
  }
}
