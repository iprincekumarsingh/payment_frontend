import React from "react";

import { Link } from "react-router-dom";
export default function Topbar({ title, imgLink, backLink, imgWidth }) {
  return (
    <nav class="bg-[#0F4A8A] shadow-md">
      <div class="max-w-screen-xl flex items-center justify-between p-4">
        <a href={backLink} class="hidden md:block">
          <img src={imgLink} width={imgWidth} alt="" />
        </a>
        <span class="text-white text-lg font-semibold">{title}</span>
        <div class="hidden md:block"></div>
      </div>
    </nav>
  );
}
