import React from "react";

function PerPageSelect({ perPages, perPage, setPerPage }) {
  return (
    <select
      value={perPage}
      onChange={(e) => {
        setPerPage(e.target.value);
      }}
      className="itemBg7 rounded-full px-4 py-2 border-r-8 border-transparent outline-0"
    >
      {perPages.map((row, key) => {
        return (
          <option key={key} value={row}>
            {row}
          </option>
        );
      })}
    </select>
  );
}

export default PerPageSelect;
