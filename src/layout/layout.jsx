import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

export default function LayoutHome() {
  useEffect(() => {
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);

  return (
    <>
      {/* <div
        class="p-4 text-sm text-red-800  bg-[#CAD5E2] dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">
          To start using the app, please update your profile.
        </span>
      </div> */}
      <Outlet />
      <div className="w-full">
        {/* <section id="bottom-navigation" class="md:hidden block fixed inset-x-0 bottom-0 z-10 bg-white shadow"> // if shown only tablet/mobile*/}
        <section
          id="bottom-navigation"
          className="block fixed inset-x-0 bottom-0 z-10 bg-[#eaeaea] shadow"
        >
          <div id="tabs" className="flex justify-between">
            <Link
              to={"home/user"}
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <svg
                width={20}
                height={20}
                viewBox="0 0 42 42"
                className="inline-block mb-1"
              >
                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <path
                    d="M21.0847458,3.38674884 C17.8305085,7.08474576 17.8305085,10.7827427 21.0847458,14.4807396 C24.3389831,18.1787365 24.3389831,22.5701079 21.0847458,27.6548536 L21.0847458,42 L8.06779661,41.3066256 L6,38.5331279 L6,26.2681048 L6,17.2542373 L8.88135593,12.4006163 L21.0847458,2 L21.0847458,3.38674884 Z"
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M11,8 L33,8 L11,8 Z M39,17 L39,36 C39,39.3137085 36.3137085,42 33,42 L11,42 C7.6862915,42 5,39.3137085 5,36 L5,17 L7,17 L7,36 C7,38.209139 8.790861,40 11,40 L33,40 C35.209139,40 37,38.209139 37,36 L37,17 L39,17 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M22,27 C25.3137085,27 28,29.6862915 28,33 L28,41 L16,41 L16,33 C16,29.6862915 18.6862915,27 22,27 Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="currentColor"
                    fillOpacity="0.1"
                  />
                  <rect
                    fill="currentColor"
                    transform="translate(32.000000, 11.313708) scale(-1, 1) rotate(-45.000000) translate(-32.000000, -11.313708) "
                    x={17}
                    y="10.3137085"
                    width={30}
                    height={2}
                    rx={1}
                  />
                  <rect
                    fill="currentColor"
                    transform="translate(12.000000, 11.313708) rotate(-45.000000) translate(-12.000000, -11.313708) "
                    x={-3}
                    y="10.3137085"
                    width={30}
                    height={2}
                    rx={1}
                  />
                </g>
              </svg>
              <span className="tab tab-home block text-xs">Home</span>
            </Link>

            <Link
              to={"home/profile"}
              className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
            >
              <svg
                width={25}
                height={25}
                className="inline-block mb-1"
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M252 520 c-81 -50 -95 -163 -28 -219 14 -12 11 -17 -22 -41 -40 -28
                    -67 -75 -78 -129 -6 -26 -3 -31 13 -31 14 0 22 11 30 43 7 23 23 53 37 66 l25
                    24 31 -27 c18 -15 44 -26 60 -26 16 0 42 11 60 26 l31 27 25 -24 c14 -13 30
                    -43 37 -66 8 -30 16 -43 29 -43 47 0 -15 137 -76 170 l-25 13 24 29 c31 36 39
                    68 31 112 -18 95 -124 145 -204 96z m117 -34 c47 -25 63 -83 37 -135 -35 -66
                    -137 -66 -172 0 -47 91 44 182 135 135z m-11 -238 c-8 -22 -37 -34 -55 -22
                    -33 21 -26 34 17 34 28 0 40 -4 38 -12z"
                  />
                </g>
              </svg>

              <span className="tab tab-account block text-xs">Profile</span>
            </Link>
            {Cookie.get("role") === "admin" ? (
              <Link
                to={"home/transactions"}
                href="#"
                className="w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1"
              >
                <svg
                  width={20}
                  height={20}
                  className="inline-block mb-1"
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50.000000 50.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,50.000000) scale(0.100000,-0.100000)"
                    fill="#000000"
                    stroke="none"
                  >
                    <path
                      d="M70 435 l0 -55 55 0 c30 0 55 5 55 10 0 6 -16 10 -36 10 -44 0 -37
  15 20 41 107 48 234 -3 280 -113 57 -134 -49 -289 -196 -288 -85 1 -171 64
  -198 146 -12 35 -9 109 5 147 4 9 3 17 -3 17 -15 0 -32 -57 -32 -104 0 -46 30
  -119 63 -155 33 -36 115 -71 167 -71 52 0 134 35 167 71 34 37 63 110 63 159
  0 52 -35 134 -71 167 -72 66 -174 79 -263 35 l-56 -29 0 34 c0 18 -4 33 -10
  33 -5 0 -10 -25 -10 -55z"
                    />
                    <path
                      d="M240 335 c0 -72 -1 -76 -36 -115 -20 -22 -34 -43 -31 -47 7 -7 93 67
  91 79 -1 5 -2 42 -2 83 -2 99 -22 99 -22 0z"
                    />
                  </g>
                </svg>

                <span className="tab tab-kategori block text-xs">
                  Admin Panel
                </span>
              </Link>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
