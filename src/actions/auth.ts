import api from "../utils/api";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_SUCCESS,
} from "./types";

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch: any) => {
  try {
    const res = await api.get("/auth/me");

    dispatch({
      type: USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = (formData: any) => async (dispatch: any) => {
  try {
    const res = await api.post("/users", formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login =
  (email: string, password: string) => async (dispatch: any) => {
    const body = { email, password };

    try {
      const res = await api.post("/auth", body);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Login User
export const updateProfile =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (formData: any) => async (dispatch: any) => {
    try {
      const res = await api.post("/users/updateProfile", formData);

      dispatch({
        type: UPDATE_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err: any) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

// Login User
export const signInWithWallet = (address: string) => async (dispatch: any) => {
  const body = { address };

  try {
    const res = await api.post("/auth/loginWithWallet", body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err: any) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = () => ({ type: LOGOUT });
