import React from "react";

function SwitchTheme({ themes, theme, setTheme }) {
  return (
    <div className="flex justify-start items-center rounded-full itemBg7 p-1">
      {themes.map((row, key) => {
        return (
          <div
            key={key}
            className={`${
              row.slug === theme
                ? "bg-gradient-to-r from-[#5B46DF] to-[#BA4DF9]"
                : "bg-transparent"
            } p-2 rounded-full cursor-pointer`}
            onClick={() => setTheme(row.slug)}
          >
            <img
              src={row.slug === theme ? row.selectedIcon : row.icon}
              alt=""
              className="h-5 w-5"
            />
          </div>
        );
      })}
    </div>
  );
}

export default SwitchTheme;
