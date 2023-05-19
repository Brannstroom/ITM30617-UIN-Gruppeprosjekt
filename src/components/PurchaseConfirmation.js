import React, { useState } from "react";
import { isUserLoggedIn } from "../utils/login";

export const PurchaseConfirmation = ({ title, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleOnClose = () => {
    setIsVisible(false);
    onClose();
  };

  return isVisible ? (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-gray-100 shadow-md rounded-lg p-4">
        {isUserLoggedIn() ? (
          <>
            <div className="text-2xl font-semibold">
              Thank you for your purchase!
            </div>
            <div>
              You successfully purchased {title} and it has been added to
              your library.
            </div>
            <div className="mt-4 flex justify-end items-center">
              <a href="/library" className="hover:underline">
                Go to library
              </a>

              <button
                className="ml-4 bg-sky-900 hover:bg-sky-700 text-gray-100 px-2 py-1 rounded-md"
                onClick={handleOnClose}
              >
                Close
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-2xl font-semibold">
              You must be logged in to purchase a game.
            </div>
            <div>
              Please{" "}
              <a key="login" href="/login" className="hover:underline">
                login
              </a>{" "}
              or{" "}
              <a href="/login?signup=true" className="hover:underline">
                signup
              </a>{" "}
              to continue.
            </div>
            <div className="mt-4 flex justify-end items-center">
              <button
                className="ml-4 bg-sky-900 hover:bg-sky-700 text-gray-100 px-2 py-1 rounded-md"
                onClick={handleOnClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};
