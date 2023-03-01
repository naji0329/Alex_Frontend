import React from "react";

function Tab({ items, selectedItem, setItem, size = "lg" }) {
  return (
    <div
      className={`itemBg5 rounded-full w-max flex justify-start border-[#23262F] dark:border overflow-auto ${
        size === "lg" ? "p-2" : "p-1"
      }`}
    >
      {items.map((row, key) => {
        return (
          <button
            key={key}
            className={`rounded-full whitespace-nowrap ${
              selectedItem === row?.slug
                ? "bg-gradient-to-r from-[#5B46DF] to-[#BA4DF9] text-white"
                : "text-[#8E8E8E]"
            } ${size === "lg" ? "px-6 py-2" : "px-5 py-1 text-sm"}`}
            onClick={() => setItem(row?.slug)}
          >
            {row.value}
          </button>
        );
      })}
    </div>
  );
}

export default Tab;
