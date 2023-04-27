import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";

import logo from "../images/macslogo_white.png";
import { ChevronDown } from "../icons/ChevronDown";
import { ChevronRight } from "../icons/ChevronRight";

const Sidebar = () => {
  const [storeDropDown, setStoreDropDown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "category"]{
      title,
      slug,
      }`
      )
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const linkStyles = "mt-5 ml-4 hover:text-gray-400";
  const LinkStyleSub = "ml-8 hover:text-gray-400 mt-2";

  return (
    <div className="fixed top-0 left-0 h-full w-72 bg-gray-800">
      <div className="border-b border-gray-700 h-14 items-center flex">
        <a href="/" className="w-11/12 m-auto">
        <img src={logo} alt="logo" className="w-11/12 m-auto" />
        </a>
      </div>

      <nav className="flex flex-col flex-1 mt-4 text-2xl text-gray-200  w-4/6 m-auto">
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
              href={`/games/${category?.slug?.current}`}
              key={category.title}
              className={LinkStyleSub}
            >
              {category?.title}
            </a>
          ))}

        <a href="/library" className={linkStyles}>
          Library
        </a>
      </nav>

      <div>
        <a
          href="/login"
          className="absolute bottom-0 left-0 w-full border-t border-gray-700 h-14 flex items-center justify-center text-2xl text-gray-200 hover:text-gray-400"
        >
          Login
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
