import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function SignUpButton() {
  const { t } = useTranslation();

  return (
    <Link to={"/signup"}>
      <button className="px-4 text-white whitespace-nowrap bg-gradient-to-r from-[#5B46DF] to-[#BA4DF9] h-9 rounded-full">
        {t("Sign Up")}
      </button>
    </Link>
  );
}

export default SignUpButton;
