import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { withTrans } from "./i18n/withTranslations";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { LOGOUT } from "./actions/types";

import useAuth from "./hook/useAuth";
import { useEffectOnce } from "./hook/useEffectOnce";

// Components
import PrivateRoute from "./components/routing/PrivateRoute";
import Container from "./components/layout/Container";
import SendCode from "./views/auth/SendCode";

// Views
import Home from "./views/Home";
import Login from "./views/auth/Login";
import SignUp from "./views/auth/SignUp";
import Loading from "./components/layout/Loading";
import Profile from "./views/auth/Profile";
import NotFound from "./components/layout/NotFound";
import Alert from "./components/layout/Alert";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

function App() {
  const { loadUser } = useAuth();

  useEffectOnce(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    loadUser();

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  });

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Container Component={Home} />} />
          <Route
            path="/login"
            element={
              <Container Component={Login} isNavbar={false} isFooter={false} />
            }
          />
          <Route
            path="/auth/send-code"
            element={
              <Container
                Component={SendCode}
                isNavbar={false}
                isFooter={false}
              />
            }
          />

          <Route
            path="/signup"
            element={
              <Container Component={SignUp} isNavbar={false} isFooter={false} />
            }
          />

          <Route
            path="/user/profile"
            element={
              <Container>
                <PrivateRoute component={Profile} />
              </Container>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Loading />
      <Alert />
    </Provider>
  );
}

export default withTrans(App);
