import React from "react";

export default function HomeIcons({ onclickBtn, text_p, icon }) {
  return (
    <div
    onClick={onclickBtn}
    className="flex flex-col justify-center items-center text-center w-full md:w-48 text-sm md:text-base"
    style={{
    
      padding: "0.5rem",
      borderRadius: "10px",
    }}
  >
    <img className="h-6 mb-2" src={icon} alt="" width={30} />
    <p className="w-full text-xs md:text-base">{text_p}</p>
  </div>
  
  );
}
