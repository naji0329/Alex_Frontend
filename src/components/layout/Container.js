import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Container = ({
  isNavbar = true,
  isFooter = true,
  Component,
  children,
}) => {
  return (
    <>
      {isNavbar && <Navbar />}
      {Component && <Component />}
      {children}
      {/* {isFooter && <Footer />} */}
    </>
  );
};

export default Container;
