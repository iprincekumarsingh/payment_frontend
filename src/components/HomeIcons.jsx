import React from "react";

export default function HomeIcons({ onclickBtn, text_p, icon }) {
  return (
    <div
      onClick={onclickBtn}
      className="flex-col  justify-center items-center text-center w-[150px]   text-[14px]   "
      style={{
        // background: "rgb(202, 213, 226)",
        padding: "5px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img className="vertical-0" src={icon} alt="" width={30} />
      <p className="text-[14px] w-full">{text_p}</p>
    </div>
  );
}
