import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="bg-white/50 w-screen h-screen flex justify-center items-center">
      <div>
        <p className="text-[#FFC80F] text-center text-6xl font-medium">404</p>
        <p className=" text-center text-black text-lg font-normal">
          Page not found
        </p>
        <p className="text-md">
          Go to the{" "}
          <span className="text-blue-600">
            <Link to={"/"}>Dashboard</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default NotFound;
