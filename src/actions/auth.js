import api from "../utils/api";
import { setAlert } from "./alert";
import { USER_LOADED, AUTH_ERROR, UPDATE_SUCCESS, UPDATE_FAIL } from "./types";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/auth/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Update User
export const updateUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/users/update", formData);

    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: UPDATE_FAIL,
    });
  }
};
