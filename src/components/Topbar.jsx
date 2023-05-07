import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { CiSettings, CiLogout } from "react-icons/ci";

import { Link } from "react-router-dom";
export default function Topbar({ title, imgLink, backLink, imgWidth }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="bg-[#0F4A8A] shadow-md">
    <div className="max-w-screen-xl flex items-center justify-between p-4">
      <a href={backLink} className="hidden md:block">
        <img src={imgLink} width={imgWidth} alt="" />
      </a>
      <span className="text-white text-lg font-semibold">{title}</span>
      <div className="relative">
        <div
          onClick={toggleDropdown}
          className="flex justify-center items-center cursor-pointer"
        >
          <CgProfile className="text-white text-xl" />
        </div>
        {showDropdown && (
          <div className="absolute top-10 right-0 z-10 bg-white shadow-lg rounded-md py-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              <CgProfile className="mr-2" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              <CiSettings className="mr-2" />
              <span>Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={toggleDropdown}
            >
              <CiLogout className="mr-2" />
              <span>Logout</span>
            </a>
          </div>
        )}
      </div>
    </div>
  </nav>
  );
}
