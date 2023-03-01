import React from "react";
import { useTranslation } from "react-i18next";

function SubmitButton({ label }) {
  const { t } = useTranslation();

  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-[#5B46DF] to-[#BA4DF9]  mt-5 h-12 rounded text-white"
    >
      {t(label)}
    </button>
  );
}

export default SubmitButton;
