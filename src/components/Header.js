import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { useThemeState } from "../context/ThemeContext";
import {
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineLogoutIcon,
} from "../icons";

function Header() {
  let history = useHistory();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const [theme, setTheme] = useThemeState();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { toggleSidebar } = useContext(SidebarContext);

  function handleLogout() {
    localStorage.removeItem("@controle-financeiro/token");
    history.push("/login")
  }
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center md:justify-end justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}

        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleTheme}
              aria-label="Toggle color mode"
            >
              {theme === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            {/*
            <button
              type="button"
              className="flex items-center focus:outline-none"
              aria-label="toggle profile dropdown"
            >
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                  className="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>
              <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
                Khatab wedaa
              </h3>
            </button>
            */}
            {/*<!-- Dropdown toggle button -->*/}
            <button
              type="button"
              className="flex items-center focus:outline-none"
              aria-label="toggle profile dropdown"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=334&amp;q=80"
                  className="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>
              <h3 className="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden">
                Usuário
              </h3>
            </button>

            {/*<!-- Dropdown menu -->*/}
            <div
              onClick={() => setIsProfileMenuOpen(false)}
              className={`${
                isProfileMenuOpen ? "fixed" : "hidden"
              } top-0 right-0 left-0 bottom-0 w-full h-full`}
            ></div>
            <ul
              className={`${
                isProfileMenuOpen ? "absolute" : "hidden"
              } w-56 p-2 mt-2 text-gray-600 bg-white border border-gray-100 rounded-lg shadow-md min-w-max-content dark:text-gray-300 dark:border-gray-700 dark:bg-gray-700 right-0`}
              aria-label="submenu"
            >
              <li className="mb-2 last:mb-0">
                <Link
                  className="inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  type="button"
                  to="/app/profile"
                >
                  <OutlinePersonIcon
                    className="w-4 h-4 mr-3"
                    aria-hidden="true"
                  />
                  <span>Perfil</span>
                </Link>
              </li>

              <li className="mb-2 last:mb-0">
                <button
                  className="inline-flex items-center cursor-pointer w-full px-2 py-1 text-sm font-medium transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                  type="button"
                  onClick={handleLogout}
                >
                  <OutlineLogoutIcon
                    className="w-4 h-4 mr-3"
                    aria-hidden="true"
                  />
                  <span>Sair</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
