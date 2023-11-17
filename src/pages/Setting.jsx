import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Cookie from "js-cookie";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import PasswordOutlinedIcon from "@mui/icons-material/PasswordOutlined";
import LockResetOutlinedIcon from "@mui/icons-material/LockResetOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

import axios from "../api/axios";
import { Link } from "@mui/material";

export default function Setting() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [pass, setPass] = useState("");
  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
  useEffect(() => {
    // Check if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        "auth/changepassword",
        {
          newPassword: pass, // Fix the key to "newPassword"
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then(() => {
        alert("Password changed successfully");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  const handlePassChange = (e) => {
    console.log(e.target.value);
    const newPin = e.target.value;
    setPass(newPin);
  };

  return (
    <div className="overflow-hidden">
      <h1 className="text-white text-center py-2 text-xl border-b-2">
        Setting{" "}
      </h1>
      <div className="">
        <div className="container mx-auto">
          <div className="rounded-lg px-4">
            <div className="mb-6">
              <ul className="bg-white divide-gray-200"></ul>
            </div>
            <div
              className="mt-5 flex gap-3 items-center w-full py-2"
              onClick={togglePopup}
            >
              <div className="flex items-center gap-3">
                <LockResetOutlinedIcon
                  style={{
                    color: "white",
                  }}
                />
                <div className="flex flex-col">
                  <h1 className="text-base font-normal">Change Password</h1>
                </div>
              </div>
            </div>
            {isPopupOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center  ">
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
                  <div className="bg-white w-[250px]  rounded-md ">
                    <div className="flex justify-between px-1 items-center">
                      <h2 className="text-base px-2 py-2 text-black font-semi  text-start ">
                        Set Your Password
                      </h2>
                      <CloseOutlinedIcon
                        style={{
                          color: "black",
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: "black",
                          color: "black",
                        }}
                      />
                    </div>

                    {/* set pin pop-up */}
                    <div className="w-full flex  items-center justify-center ">
                      <form onSubmit={handleSubmit}>
                        <input
                          type="password" // Assuming it's a password input
                          minLength={4}
                          placeholder="New Password"
                          className="border w-full border-gray-400 rounded-md py-2 px-2"
                          value={pass}
                          onChange={handlePassChange}
                        />
                        <button
                          className="w-full mt-5 py-2 bg-blue-400 mb-2 text-white text-xl font-light rounded-md"
                          type="submit"
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 flex gap-3 items-center w-full py-2">
              <div className="flex items-center justify-between w-full gap-3">
                <div className="flex items-center gap-3">
                  <PasswordOutlinedIcon
                    style={{
                      color: "white",
                    }}
                  />
                  <div className="flex flex-col">
                    <h1 className="text-base font-normal">Change Pin</h1>
                  </div>
                </div>
                <div>
                  <h1 className="text-[14px]">Remove</h1>
                </div>
              </div>
            </div>
            <a href="/terms">
              <div className="mt-5 flex gap-3 items-center w-full py-2">
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex items-center gap-3">
                    <ArticleOutlinedIcon
                      style={{
                        color: "white",
                      }}
                    />
                    <div className="flex flex-col">
                      <h1 className="text-base font-normal">
                        Terms & Conditions
                      </h1>
                    </div>
                  </div>
                 
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
