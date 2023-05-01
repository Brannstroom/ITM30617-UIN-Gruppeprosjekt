import React from "react";
import { isUserLoggedIn } from "../utils/login";

export const LoginCard = () => {
  return (
    <div>
      {isUserLoggedIn() ? (
        <>
        <div className="absolute bottom-14 left-0 w-full border-t border-gray-700 h-14 flex items-center justify-center text-2xl text-gray-200 hover:text-gray-400">
          {JSON.parse(localStorage.getItem("user"))[0].username}
        </div>
        <button
          className="absolute bottom-0 left-0 w-full border-t border-gray-700 h-14 flex items-center justify-center text-2xl text-gray-200 hover:text-gray-400"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
        </>
      ) : (
        <a
          href="/login"
          className="absolute bottom-0 left-0 w-full border-t border-gray-700 h-14 flex items-center justify-center text-2xl text-gray-200 hover:text-gray-400"
        >
          Login
        </a>
      )}
    </div>
  );
};
