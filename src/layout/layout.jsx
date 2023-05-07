import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Cookie from "js-cookie";
import ButtonNavigation from "../components/ButtonNavigation";

export default function LayoutHome() {
  return (
    <>
      <Outlet />

      <div className="w-full">
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-[#dde3e9] shadow"
        >
          <div id="tabs" className="flex justify-between">
            <ButtonNavigation
              nav_link={"home/user"}
              nav_icon={
                "M234 862h165V624.5h162V862h165V493L480 306 234 492.333V862Zm-22 22V481.5L480 279l268 203v402H539V646.5H421V884H212Zm268-300Z"
              }
              nav_text={"Home"}
            ></ButtonNavigation>

            <ButtonNavigation
              nav_link={"home/profile"}
              nav_icon={
                "M248.483 805.5Q303 769 358 747.5 413 726 480 726t121.75 21.5q54.75 21.5 110.75 58 42.5-44.5 68-102.498Q806 645.004 806 576.275q0-135.775-95.25-231.025T480 250q-135.5 0-230.75 95.25T154 576.275q0 68.729 25.5 126.727Q205 761 248.483 805.5ZM479.789 587q-48.289 0-80.539-32.461T367 473.789q0-48.289 32.461-80.539t80.75-32.25q48.289 0 80.539 32.461t32.25 80.75q0 48.289-32.461 80.539T479.789 587Zm.429 337q-72.625 0-136.246-27.263-63.621-27.263-110.547-74.5Q186.5 775 159.25 711.94 132 648.881 132 575.984q0-72.391 27.263-135.799 27.263-63.409 74.5-110.547Q281 282.5 344.06 255.25 407.119 228 480.016 228q72.391 0 135.799 27.263 63.409 27.263 110.547 74.5Q773.5 377 800.75 440.326 828 503.651 828 575.782q0 72.624-27.263 136.246-27.263 63.621-74.5 110.547Q679 869.5 615.674 896.75 552.349 924 480.218 924Zm-.278-22q57.06 0 113.81-20.5T694 822q-43.5-34-97.7-54-54.199-20-116.21-20-62.011 0-117.3 19-55.29 19-95.79 55 42.5 39 99.19 59.5T479.94 902Zm.2-337q39.36 0 65.11-25.89Q571 513.221 571 473.86q0-39.36-25.89-65.11Q519.221 383 479.86 383q-39.36 0-65.11 25.89Q389 434.779 389 474.14q0 39.36 25.89 65.11Q440.779 565 480.14 565Zm-.14-91Zm0 351Z"
              }
              nav_text={"Profile"}
            ></ButtonNavigation>
          </div>
        </section>
      </div>
    </>
  );
}
