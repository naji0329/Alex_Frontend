import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ToggleColorTheme from "./ToggleColorTheme";
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import { useSelector } from "react-redux";
import useAuth from "../../../hook/useAuth";
import useLoading from "../../../hook/useLoading";

export default function MobileMenu({ setShow, isShow }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const { logout } = useAuth();
  const { setLoading } = useLoading();

  const onLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <div
      className={`${
        isShow ? "block" : "hidden"
      } xl:hidden fixed z-40 top-0 left-0 w-screen h-screen itemBg2 overflow-auto`}
    >
      <div className="n-container border-b border-[#DFDFDF] dark:border-[#23262F] py-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-4 items-center">
            <Link to={"/"}>
              <img
                src="/logo.png"
                className="h-10 w-10 sm:h-16 sm:w-16"
                alt=""
              />
            </Link>
          </div>

          <div className="flex justify-end items-end gap-4">
            <ToggleColorTheme />
            <p
              className="lg:hidden cursor-pointer"
              onClick={() => setShow(false)}
            >
              <CloseIcon />
            </p>
          </div>
        </div>
      </div>

      <div className="n-container text-color2 dark:text-white text-lg text-center gap-6 pt-5">
        {isAuthenticated ? (
          <>
            <Link
              to={"/user/profile"}
              onClick={() => {
                setShow(false);
              }}
            >
              <p className="mt-2 py-2 hover:bg-white/10 border-b border-[#DFDFDF]/30 dark:border-[#23262F]/30 ">
                Profile
              </p>
            </Link>
            <p
              className="mt-2 py-2 hover:bg-white/10 border-b border-[#DFDFDF]/30 dark:border-[#23262F]/30 "
              onClick={async () => {
                await onLogout();
                setShow(false);
              }}
            >
              Logout
            </p>
          </>
        ) : (
          <div className="flex justify-center py-2 gap-4">
            <SignInButton />
            <SignUpButton />
          </div>
        )}
      </div>
    </div>
  );
}
