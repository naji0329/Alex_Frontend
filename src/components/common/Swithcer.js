import React, { useState } from "react";
import useDarkSide from "../../hook/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Swithcer(props) {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <div className="flex flex-col items-center">
      <DarkModeSwitch
        checked={darkSide}
        onChange={toggleDarkMode}
        className="w-[20px]"
      />
    </div>
  );
}

export default Swithcer;
