import React from "react";
import { Link } from "react-router-dom";

export default function ButtonNavigation({ nav_link, nav_icon, nav_text }) {
  return (
    <Link
      to={nav_link}
      className="flex flex-col bg-[#0d102c] items-center justify-center w-full pt-2 pb-1 text-center text-xs focus:text-teal-500 hover:text-teal-500"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40"
        viewBox="0 96 960 960"
        width="40"
      >
        <path d={nav_icon} />
      </svg>
      <span className="block tab tab-home">{nav_text}</span>
    </Link>
  );
}
