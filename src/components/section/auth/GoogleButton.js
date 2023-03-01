import React from "react";

import JWTDecode from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import useLoading from "../../../hook/useLoading";
import useAuth from "../../../hook/useAuth";

function GoogleButton(props) {
  const { setLoading } = useLoading();
  const { googleLogin } = useAuth();
  const { t } = useTranslation();

  const onGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const user = JWTDecode(tokenResponse.credential);
      console.log("tokenResponse", user);
      setLoading(true);
      await googleLogin({
        name: user.given_name,
        email: user.email,
        type: "google",
      });
      setLoading(false);
    },
  });

  return (
    <button
      onClick={onGoogleLogin}
      className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-[#575A70]/40 to-[#575A70]/50  mt-3 h-12 rounded"
    >
      <img src="/img/google.png" alt="" className="w-8" />
      {t("Login in with Google")}
    </button>
  );
}

export default GoogleButton;
