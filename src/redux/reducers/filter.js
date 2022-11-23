import { APPLY_FILTER, SET_DATE } from 'redux/actions/actionTypes';

const initialState = { filterType: 'none', selectedDate: new Date().valueOf() };

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_FILTER:
      return { ...state, filterType: action.payload.newFilter };
    case SET_DATE:
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
}
