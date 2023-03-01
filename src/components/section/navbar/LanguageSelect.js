import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { languages } from "../../../constants";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

function LanguageSelect() {
  const [language, setSelLang] = useState(languages[0]);

  const { i18n } = useTranslation();

  const setSelLanguage = (lang) => {
    setSelLang(lang);
    i18n.changeLanguage(`${lang.slug}`);
  };

  return (
    <div className="hidden sm:block">
      <div className="w-max relative">
        <Menu>
          <MenuHandler>
            <div className=" flex items-center cursor-pointer">
              <p className="text-fourth">{language.name}</p>
              <ArrowDropDownIcon />
            </div>
          </MenuHandler>
          <MenuList className="w-max dark:bg-[#101115] border-white/5 border p-0">
            {languages.map((row, key) => {
              return (
                <MenuItem
                  className="hover:bg-white/10 flex justify-start items-center p-2"
                  key={key}
                >
                  <div
                    onClick={() => setSelLanguage(row)}
                    className="flex items-center gap-2 "
                  >
                    <img src={row.flag} alt="" width={"20"} />
                    <p>{row.name}</p>
                  </div>
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default LanguageSelect;
