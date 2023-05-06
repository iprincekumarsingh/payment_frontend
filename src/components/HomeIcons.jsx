import React from "react";

export default function HomeIcons({ onclickBtn, text_p, icon }) {
  return (
    <div
      onClick={onclickBtn}
      className="flex-col  justify-center items-center text-center  w-[100px] "
      style={{
        // background: "rgb(202, 213, 226)",
        padding: "10px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img className="vertical-0" src={icon} alt="" width={50} />
      <p>{text_p}</p>
    </div>
  );
}
