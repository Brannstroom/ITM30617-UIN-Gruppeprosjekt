import React, { useEffect, useState } from "react";

import logo from "../../images/macslogo_white.png";
import { ChevronDown } from "../../icons/ChevronDown";
import { ChevronRight } from "../../icons/ChevronRight";
import { isUserLoggedIn } from "../../utils/login";
import { LoginCard } from "../LoginCard";
import { getCategories } from "../../api/category";

const Sidebar = () => {
  const [storeDropDown, setStoreDropDown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);


  const linkStyles = "mt-5 ml-4 hover:text-gray-400";
  const LinkStyleSub = "ml-8 hover:text-gray-400 mt-2";

  return (
      <div className="fixed top-0 left-0 h-full w-72 bg-gray-800">
        <div className="border-b border-gray-700 h-14 flex items-center">
          <a href="/" className="w-11/12 m-auto">
            <img src={logo} alt="logo" className="w-11/12 m-auto" />
          </a>
        </div>

        <nav className="flex flex-col flex-1 mt-4 text-2xl text-gray-200">
          <a href="/" className={linkStyles}>
            Home
          </a>

          <div className="mt-5 ml-4">
            <a href="/games" className="hover:text-gray-400">
              Store
            </a>
            <button
                onClick={() => setStoreDropDown(!storeDropDown)}
                className="w-20 hover:text-gray-400"
            >
              {storeDropDown ? <ChevronDown /> : <ChevronRight />}
            </button>
          </div>

          {storeDropDown &&
              categories &&
              categories.map((category) => (
                  <a
                      href={`/games/${category.toLowerCase()}`}
                      key={category}
                      className={LinkStyleSub}
                  >
                    {category}
                  </a>
              ))}
          {isUserLoggedIn() && (
              <>
                <a href="/library" className={linkStyles}>
                  Game library
                </a>
                <a href="/favorites" className={linkStyles}>
                  Favorites
                </a>
              </>
          )}
        </nav>
        <LoginCard />
      </div>
  );
};

export default Sidebar;
