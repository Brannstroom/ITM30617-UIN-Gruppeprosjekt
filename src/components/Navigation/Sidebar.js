import React, { useEffect, useState } from "react";

import logo from "../../images/macslogo_white.png";
import { ChevronDown } from "../../icons/ChevronDown";
import { ChevronRight } from "../../icons/ChevronRight";
import { isUserLoggedIn } from "../../utils/login";
import { LoginCard } from "../LoginCard";
import { getCategories } from "../../api/category";
import { ChevronLeft } from "../../icons/ChevronLeft";
import { Home } from "../../icons/Home";
import { Store } from "../../icons/Store";
import { Library } from "../../icons/Library";
import { Favorite } from "../../icons/Favorite";

const Sidebar = ({onToggle, sidebarCollapsed}) => {
  const [storeDropDown, setStoreDropDown] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  const handleSidebarToggle = () => {
    onToggle(!sidebarCollapsed);
    if(storeDropDown) setStoreDropDown(false);
  }


  const linkStyles = "mt-5 ml-4 hover:text-gray-400 flex items-center";
  const LinkStyleSub = "ml-8 hover:text-gray-400 mt-2";

  return (
      <div className={`fixed top-0 left-0 h-full bg-gray-800 ${sidebarCollapsed ? "w-20" : "w-72"}`}>
        <div className="border-b border-gray-700 h-14 flex items-center">
          <a href="/" className="w-11/12 m-auto">
            <img src={logo} alt="logo" className="w-11/12 m-auto" />
          </a>
        </div>

          <button
              id="sidebar-toggle"
              onClick={handleSidebarToggle}
              className="h-7 w-7 rounded-full absolute top-4 -right-4 bg-gray-800 text-white"
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>

        <nav className="flex flex-col flex-1 mt-4 text-2xl text-gray-200">
          <a href="/" className={linkStyles}>
            <Home />
            {!sidebarCollapsed && "Home"}
          </a>

          <div className="mt-5 ml-4 flex">
            <a href="/games" className="flex items-center hover:text-gray-400">
              <Store />
              {!sidebarCollapsed && "Store"}
            </a>
            <button
                onClick={() => {
                  setStoreDropDown(!storeDropDown);
                  if(sidebarCollapsed) handleSidebarToggle();
                }}
                className="w-20 hover:text-gray-400"
            >
              {storeDropDown ? <ChevronDown /> : <ChevronRight />}
            </button>
          </div>

          {storeDropDown &&
              categories &&
              categories.map((category) => (
                  <a
                      href={`/games/${category.slug.current}`}
                      key={category.slug.current}
                      className={LinkStyleSub}
                  >
                    {category.title}
                  </a>
              ))}
          {isUserLoggedIn() && (
              <>
                <a href="/library" className={linkStyles}>
                  <Library />
                  {!sidebarCollapsed && "Game library"}
                </a>
                <a href="/favorites" className={linkStyles}>
                  <Favorite />
                  {!sidebarCollapsed && "Favorites"}
                </a>
              </>
          )}
        </nav>
        <LoginCard sidebarCollapsed={sidebarCollapsed}/>
      </div>
  );
};

export default Sidebar;
