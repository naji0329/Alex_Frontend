import { SET_LOADING } from "../actions/types";

const initialState = {
  isLoading: false,
};

function loadingReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}

export default loadingReducer;
