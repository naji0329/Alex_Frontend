import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

function Alert() {
  const themeColor = useSelector((state) => state.auth.theme);

  return (
    <ToastContainer
      theme={themeColor === "light" ? "light" : "dark"}
      autoClose={3000}
    />
  );
}

export default Alert;
