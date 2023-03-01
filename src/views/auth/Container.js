import React from "react";

function Container({ children }) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen authBg z-40">
      <div className="h-full flex justify-center items-center bg-gradient-to-t from-[#BFA391]/70 dark:from-[#694C3E]/10 to-[#A6A0A8]/40 dark:to-[#575561]/30">
        {children}
      </div>
    </div>
  );
}

export default Container;
