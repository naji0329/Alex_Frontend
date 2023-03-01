import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

function Dropdown({ Header, items }) {
  return (
    <Menu>
      <MenuHandler>{Header}</MenuHandler>
      <MenuList className=" grayGradientBg1 border-white/5 border p-2">
        {items.map((row, key) => {
          return (
            <MenuItem
              key={key}
              className="hover:bg-white/10 flex justify-center items-center p-2"
            >
              {row.content}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default Dropdown;
