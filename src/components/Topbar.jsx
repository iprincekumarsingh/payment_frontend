import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
function Topbar({ name }) {
  return (
    <div className="px-6  py-1 w-full  flex justify-between items-center bg-[#121212] text-white border-b-[1px] border-blue-100 ">
      <div>
        <h1 className="text-slate-300 text-xl font-medium">Good Morning!</h1>
        <span className="text-white text-2xl font-bold">{name}</span>
      </div>
      <div className="flex items-center gap-2">
        {/* <h1 className="text-black text-3xl font-bold"></h1> */}
        {Cookies.get("role") === "admin" ? (
          <Link to="../notification">
            <NotificationsNoneOutlinedIcon
              sx={{
                fontSize: 20,
                width: 40,
                height: 60,
                // color: "#C6FF7D",
                // background: 'black',
                borderRadius: "50%",
              }}
            />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export default Topbar;
