import React from "react";
import { Link } from "react-router-dom";

export default function ButtonNavigation({ nav_link, nav_icon, nav_text }) {
    return (

        <Link
            style={{
                display: "flex",
            }}
            to={nav_link}
            className="w-full flex-col justify-center items-center focus:text-teal-500 hover:text-teal-500  inline-block text-center pt-2 pb-1"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40"
                viewBox="0 96 960 960"
                width="40"
            >
                <path d={nav_icon}></path>


            </svg>
            <span className="tab tab-home block text-xs">{nav_text}</span>
        </Link>

    );
}
