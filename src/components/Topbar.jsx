import Cookies from "js-cookie";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import adminIcon from "../img/icons/admin.png"

import { CiSettings, CiLogout } from "react-icons/ci";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
export default function Topbar({ title, imgLink, backLink, imgWidth }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleGoBack() {
    navigate(-1);
  }

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const logout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    Cookie.remove("role");
    localStorage.removeItem("PROFILE_DATA");

    window.location.href = "/";
  };
  function renderBackButton() {
    if (location.pathname === "/" || location.pathname === "/home/home/user") {
      // If the current route is either '/' or '/home/user', don't render the back button
      return null;
    } else {
      // Otherwise, render a back button that navigates to the previous page
      return (
        <Link to="#" onClick={() => window.history.back()}>
          <AiOutlineArrowLeft className="text-white" />
        </Link>
      );
    }
  }

  return (
    <nav className="bg-[#0F4A8A] shadow-md">
      <div className="max-w-screen-xl flex items-center justify-between p-4">
        <div className="flex items-center">
          {renderBackButton()}
          <a href={imgLink} className="hidden md:block">
            <img src={imgLink} width={imgWidth} alt="" />
          </a>
          <span className="text-white text-lg font-semibold ml-2">{title}</span>
        </div>
        <div className="relative p-21">
          <div
            onClick={toggleDropdown}
            className="flex justify-center items-center cursor-pointer"
          >
            <CgProfile className="text-white text-xl" />
          </div>
          {showDropdown && (
            <div className="absolute top-10 right-0 z-10 bg-white shadow-xl rounded-md py-1 p-10">
              <Link
                to={"../../home/profile"}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={toggleDropdown}
              >
                <CgProfile className="mr-2" />
                <span>Profile</span>
              </Link>

              <Link
                to={"../../settings"}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <CiSettings className="mr-2" />
                <span>Settings</span>
              </Link>

              {Cookie.get("role") === "admin" ? (
                <Link
                  to={"../home/admin"}
                  className="flex items-center px-4 py-2 hover:bg-gray-100"
                >
                  <img src={adminIcon} width={20} className="mr-2" alt="" srcset="" />
                  <span>Admin</span>
                </Link>
              ) : (
                <></>
              )}

              <div
                href="#"
                className="flex items-center px-4 py-2 hover:bg-gray-100"
                onClick={logout}
              >
                <CiLogout className="mr-2" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
