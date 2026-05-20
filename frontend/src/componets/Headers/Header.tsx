import React, { useState } from 'react'
// import {useSelector} from 'react-redux'
import { NavLink } from "react-router-dom";
import ToggleButton from '../Buttons/ThemeButton';
import NotificationIcon from '../Buttons/NotifcationIconButton';
import { useAppSelector } from '../../types/ThemeHookType';
import Tooltip from '../ToolTip/TootTip';
import { ChefHat, User } from "lucide-react";
import Logo from '../Logo/Logo';

export default function Headers() {
  const [open, setOpen] = useState(false);
  const mode = useAppSelector((state) => state.theme.mode)

  const onLogout = async () => {
    console.log("logout clicked")
  }

  return (
    // <header
    //   className="fixed top-0 left-0 right-0 z-50
    //          bg-gradient-to-r from-orange-500 to-red-500 dark:bg-gray-800 shadow-sm"
    // >
    <header
  className="fixed top-0 left-0 right-0 z-50
  bg-gradient-to-r from-orange-500 to-red-500 
  dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 shadow-sm"
>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        
        {/* UPDATED FLEX LAYOUT */}
        <div className="flex items-center justify-between h-16">

          {/* LEFT (empty for spacing) */}
          {/* <div className="flex-1 text-amber-50">Recipie Realam</div> */}

          <Logo/>

          {/* CENTER NAV */}
          <nav className="hidden md:flex items-center space-x-6 justify-center flex-1">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `px-2 py-1 rounded transition ${
                  isActive
                    ? "text-amber-200 font-semibold dark:text-indigo-400"
                    : "text-white hover:text-amber-100 dark:text-gray-300 dark:hover:text-indigo-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/recipies"
              className={({ isActive }) =>
                `px-2 py-1 rounded transition ${
                  isActive
                    ? "text-amber-300 font-semibold dark:text-indigo-400"
                    : "text-white hover:text-amber-100 dark:text-gray-300 dark:hover:text-indigo-400"
                }`
              }
            >
              Recipies
            </NavLink>

            <NavLink
              to="/profiles"
              className={({ isActive }) =>
                `px-2 py-1 rounded transition ${
                  isActive
                    ? "text-amber-300 font-semibold dark:text-indigo-400"
                    : "text-white hover:text-amber-100 dark:text-gray-300 dark:hover:text-indigo-400"
                }`
              }
            >
              Profiles
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `px-2 py-1 rounded transition ${
                  isActive
                    ? "text-amber-300 font-semibold dark:text-indigo-400"
                    : "text-white hover:text-amber-100 dark:text-gray-300 dark:hover:text-indigo-400"
                }`
              }
            >
              Settings
            </NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">

            <Tooltip
              position='bottom'
              content={mode === "dark" ? "Enable light mode" : "Enable dark mode"}
            >
              <ToggleButton />
            </Tooltip>

            <Tooltip content="view all notification" position='bottom'>
              <NotificationIcon />
            </Tooltip>

            {/* Profile Icon */}
            <User className="w-5 h-5 text-white" />

            <button
              onClick={onLogout}
              className="px-3 py-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
            >
              Logout
            </button>

          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-white dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">

            <NavLink
              to="/home"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Home
            </NavLink>

            <NavLink
              to="/recipies"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Recipies
            </NavLink>

            <NavLink
              to="/profiles"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Profiles
            </NavLink>

            <NavLink
              to="/settings"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Settings
            </NavLink>

            <button
              onClick={() => {
                setOpen(false);
                onLogout();
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-600 dark:text-white dark:hover:bg-red-500"
            >
              Logout
            </button>

          </div>
        </div>
      )}

    </header>
  )
}