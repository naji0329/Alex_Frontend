import React, { useState } from "react";
import useDarkSide from "../../../hook/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function ToggleColorTheme() {
  const { colorTheme, setTheme } = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <img
        src={darkSide ? "/img/icons/sun.png" : "/img/icons/moon.png"}
        alt=""
        className="h-6 w-6 rounded-full cursor-pointer"
        onClick={() => toggleDarkMode(!darkSide)}
      />
    </>
  );
}

export default ToggleColorTheme;
