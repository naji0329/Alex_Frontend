import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import MobileMenu from "../section/navbar/MobileMenu";
import { useState } from "react";
import LanguageSelect from "../section/navbar/LanguageSelect";
import ToggleColorTheme from "../section/navbar/ToggleColorTheme";
import { useSelector } from "react-redux";
import ProfileDropdown from "../section/auth/ProfileDropdown";
import SignInButton from "../section/navbar/SignInButton";
import SignUpButton from "../section/navbar/SignUpButton";

const Navbar = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [isMobileMenuShow, setMobileMenuShow] = useState(false);

  return (
    <>
      <div className="bg-color3 dark:bg-[#0B0B0F] py-3">
        <div className="n-container">
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

            <div className="flex justify-end items-center gap-3 w-full sm:w-max">
              <LanguageSelect />
              <ToggleColorTheme />
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <div className="flex gap-3">
                  <SignInButton />
                  <SignUpButton />
                </div>
              )}
            </div>
            <p
              className="xl:hidden cursor-pointer"
              onClick={() => setMobileMenuShow(true)}
            >
              <MenuIcon />
            </p>
          </div>
        </div>
        <MobileMenu isShow={isMobileMenuShow} setShow={setMobileMenuShow} />
      </div>
    </>
  );
};

export default Navbar;
