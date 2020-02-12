import { CHANGE_IS_TABLET_VERSION } from 'redux/actions/actionTypes';

const initialState = {
  isTabletVersion: false
};

export default function UIParameters(state = initialState, action) {
  switch (action.type) {
    case CHANGE_IS_TABLET_VERSION:
      return { isTabletVersion: action.payload.newValue };
    default:
      return state;
  }
}
