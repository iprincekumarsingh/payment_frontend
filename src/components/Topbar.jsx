import React from "react";

import { Link } from "react-router-dom";
export default function Topbar({ title, imgLink, backLink, imgWidth }) {
  return (
    <nav className=" border-gray-200 bg-[#0F4A8A]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-start mr-3 mx-auto p-4">
        <Link to={backLink} className="flex items-center item ">
          {/* <img src={back_arrow} className="h-8 mr-3" alt="Flowbite Logo" width={30} /> */}
          <img src={imgLink} width={imgWidth} alt="" srcset="" />
        </Link>
        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
          {title}
        </span>
       
      </div>
    </nav>
  );
}
