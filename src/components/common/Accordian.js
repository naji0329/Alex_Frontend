import React from "react";

const Accordian = ({ classNames, header, body }) => {
  return (
    <>
      <div
        className={` ${classNames} mt-5 bg-primary dark:bg-fourthDark shadow-xl rounded-xl p-5`}
      >
        <button
          type="button"
          className="flex justify-between items-center w-full pb-2 font-medium text-left text-black dark:text-white border-b border-gray-200 dark:border-gray-700 "
        >
          {header}
        </button>
        <div className="mt-4 ">{body}</div>
      </div>
    </>
  );
};

export default Accordian;
