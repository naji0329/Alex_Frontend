import { googleLogout } from "@react-oauth/google";
import { setAlert } from "../actions/alert";
import {
  AUTH_ERROR,
  GOOGLE_LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED,
} from "../actions/types";
import store from "../store";
import api from "../utils/api";

export default function useAuth() {
  const loadUser = async () => {
    try {
      const res = await api.get("/auth/me");

      store.dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    } catch (err) {
      store.dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Login User
  const login = async (req) => {
    try {
      const res = await api.post("/auth/login", req);
      if (res.data.success) {
        await store.dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        loadUser();
        setAlert("Login Success.", "success");
        return true;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        store.dispatch(setAlert(error?.response?.data?.message, "error"));
        if (error?.response?.data?.message === "Must Be Verified By Email") {
          return "VerifyEmail";
        }
      } else {
        store.dispatch(setAlert("Server Error.", "error"));
      }
      return false;
    }
  };

  // const login = async (req) => {
  //   try {
  //     const res = await api.post("/auth/login", req);
  //     if (res.data.success) {
  //       setAlert(res.data.message, "success");
  //       loadUser();
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.log("errror", error);
  //     if (error?.response?.data?.message) {
  //       setAlert(error?.response?.data?.message, "error");
  //     } else {
  //       setAlert("Server Error.", "error");
  //     }
  //     return false;
  //   }
  // };

  // GOOGLE LOGIN
  const googleLogin = async (formData) => {
    try {
      console.log(formData);
      const res = await api.post("/users/googlesign", formData);
      store.dispatch({
        type: GOOGLE_LOGIN,
        payload: res.data,
      });
      loadUser();
      console.log({ res });
    } catch (err) {
      console.log(err);
      store.dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  // Register User
  const register = async (req) => {
    try {
      const res = await api.post("/auth/signup", req);
      if (res.data.success) {
        setAlert(res.data.message, "success");
        return true;
      }
      return false;
    } catch (error) {
      console.log("errror", error);
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return false;
    }
  };

  // Logout
  const logout = async () => {
    if (googleLogout) googleLogout();
    store.dispatch({ type: LOGOUT });
  };

  // Update Profile
  const updateProfile = async (formData) => {
    try {
      api.defaults.headers.post["Content-Type"] = "multipart/form-data";
      const res = await api.put("/auth/me", formData);
      if (res.data.success) {
        setAlert(res.data.message, "success");
        loadUser();
        return true;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return false;
    }
  };

  const sendVerificationCode = async (req) => {
    try {
      const res = await api.post("/auth/verify/request", req);
      if (res.data.success) {
        store.dispatch(setAlert(res.data.message, "success"));
        return true;
      }
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        store.dispatch(setAlert(error?.response?.data?.message, "error"));
      } else {
        store.dispatch(setAlert("Server Error.", "error"));
      }
      return false;
    }
  };

  return {
    loadUser,
    login,
    googleLogin,
    register,
    logout,
    updateProfile,
    sendVerificationCode,
  };
}
