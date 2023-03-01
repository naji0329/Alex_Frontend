import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SignInButton() {
  const { t } = useTranslation();

  return (
    <Link to={"/login"}>
      <button className="px-4 text-color1 dark:text-white whitespace-nowrap bg-white dark:bg-white/20 h-9 rounded-full border border- dark:border-none ">
        {t("Sign In")}
      </button>
    </Link>
  );
}

export default SignInButton;
