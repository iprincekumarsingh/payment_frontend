import React from "react";

export default function HomeIcons({ onclickBtn, text_p, icon }) {
  return (
    <div
      onClick={onclickBtn}
      className="w-full md:w-48  p-4 cursor-pointer flex flex-col items-center justify-center transition duration-300 ease-in-out transform hover:scale-105"
    >
      <img className="mb-2 rounded-full" src={icon} alt="" width={50} />
      <p className="text-sm md:text-base text-center ">{text_p}</p>
    </div>
  );
}
