import Cookies from "js-cookie";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { TbMenu } from "react-icons/tb";
import adminIcon from "../img/icons/admin.png";

import { CiSettings, CiLogout } from "react-icons/ci";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
export default function Topbar({
  title,
  imgLink,
  backLink,
  imgWidth,
  hideicon,
}) {
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
          <AiOutlineArrowLeft className="" />
        </Link>
      );
    }
  }

  return (
    // <nav className="bg-gradient-to-r from-[#5900ff] to-[#08007c] shadow-md shadow-[#575757] rounded-b-2xl">
    //   <div className="max-w-screen-xl flex items-center justify-between p-4">
    //     <div className="flex items-center">
    //       {renderBackButton()}
    //       <a href={imgLink} className="hidden md:block">
    //         <img src={imgLink}  width={imgWidth} alt="" />
    //       </a>
    //       <span className="text-white text-xl font-semibold ml-2">{title}</span>
    //     </div>

    //     <div
    //       className={`flex justify-center items-center cursor-pointer ${hideicon ? "hidden" : ""
    //         }`}
    //     >
    // <button className="group relative">
    //   <span className="text-3xl text-white">
    //     <FaUserCircle />
    //   </span>
    //   <span className="group-focus-within:block hidden right-0 top-10 w-[200px] rounded-md p-5 border shadow-xl bg-white absolute z-[9999]">
    //     <Link
    //       to={"../../home/profile"}
    //       className="flex items-center px-4 py-2 hover:bg-gray-100"
    //       onClick={toggleDropdown}
    //     >
    //       <CgProfile className="mr-2" />
    //       <span>Profile</span>
    //     </Link>

    //     <Link
    //       to={"../../settings"}
    //       className="flex items-center px-4 py-2 hover:bg-gray-100"
    //     >
    //       <CiSettings className="mr-2" />
    //       <span>Settings</span>
    //     </Link>

    //     {Cookie.get("role") === "admin" ? (
    //       <Link
    //         to={"../home/admin"}
    //         className="flex items-center px-4 py-2 hover:bg-gray-100"
    //       >
    //         <img
    //           src={adminIcon}
    //           width={20}
    //           className="mr-2"
    //           alt=""

    //         />
    //         <span>Admin</span>
    //       </Link>
    //     ) : (
    //       ""
    //     )}

    //     <span
    //       href="#"
    //       className="flex items-center px-4 py-2 hover:bg-gray-100"
    //       onClick={logout}
    //     >
    //       <CiLogout className="mr-2" />
    //       <span>Logout</span>
    //     </span>
    //   </span>
    // </button>
    //     </div>
    //   </div>
    // </nav>
    <header className="p-5 bg-white flex justify-between items-center rounded-b-md shadow-sm border">
      <p className="text-xl font-[900] capitalize flex items-center space-x-3">
        {renderBackButton()} <span>{title}</span>
      </p>
      <div>
        <button className="group relative">
          <span className="text-3xl">
            <TbMenu />
          </span>
          <span className="group-focus-within:block hidden right-0 top-10 w-[200px] rounded-md p-5 border shadow-xl bg-white absolute z-[9999]">
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
                to={
                  window?.location?.pathname?.includes("/home/user")
                    ? "../home/admin"
                    : "../home/home/admin"
                }
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <img src={adminIcon} width={20} className="mr-2" alt="" />
                <span>Admin</span>
              </Link>
            ) : (
              ""
            )}

            <span
              href="#"
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={logout}
            >
              <CiLogout className="mr-2" />
              <span>Logout</span>
            </span>
          </span>
        </button>
      </div>
    </header>
  );
}
