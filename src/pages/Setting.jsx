import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Cookie from "js-cookie";
import axios from "../api/axios";
export default function Setting() {
  const [fullname, setfullname] = useState("");
  const [name, setName] = useState("");
  const [alertnativephone, setalertnativephone] = useState("");
  const [accountnumber, setaccountnumber] = useState("");
  const [ifsc, setifsc] = useState("");
  const [bankname, setbankname] = useState("");
  const [addhar, setaddhar] = useState("");
  const [phone, setPhone] = useState("");
  const [wallet, setWallet] = useState("");
  const [counter, setCounter] = useState(0);
  const [letterFormat, setLetterFormat] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [pin, setPin] = useState("");
  useEffect(() => {
    //checkk if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("PROFILE_DATA") != null) {
      const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));
      setfullname(data.fullname);
      setalertnativephone(data.alt_phone);
      setaccountnumber(data.account_number);
      setifsc(data.ifsc_code);
      setbankname(data.bank_name);
      setPhone(data.phone);
      setaddhar(data.aadhaar_number);
      setWallet(data.wallet_no);
      setName(data.fullname);
      //  get the fisrt letter of name
      // setLetterFormat(data.name.charAt(0));
    }
    if (localStorage.getItem("pin")) {
      setPin(localStorage.getItem("pin"));
    }
  }, []);

  const handleSubmit = (newPass) => {
    // alert(newPass);

    axios
      .put(
        "auth/changepassword",
        {
          newPassowrd: newPass,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        alert("Password changed successfully");
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  return (
    <>
      <Topbar title="Settings" hideicon={"hidden"}></Topbar>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-6">
          {/* <h1 className="text-3xl font-bold mb-4">Settings</h1> */}
          <div className="bg-white rounded-lg shadow-lg px-4 py-2">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Account Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-700">{name}</p>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Wallet Number : {wallet}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Phone:
                  </p>
                  <p className="text-sm text-gray-700">{phone}</p>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">
                Bank Account Information
              </h2>
              <div className="">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Bank name: {bankname}
                  </p>
                  <p className="text-sm text-gray-500">
                    {/* <a href="3" target="_blank" rel="noopener noreferrer"> */}
                    Account Number :{accountnumber}
                    {/* </a> */}
                  </p>
                  <p className="text-sm text-gray-500">
                    {/* <a href="3" target="_blank" rel="noopener noreferrer"> */}
                    IFSC Code :{ifsc}
                    {/* </a> */}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Settings</h2>
              <ul className="bg-white divide-y divide-gray-200">
                <li className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-sm font-medium text-gray-900"
                      onClick={(e) => {
                        const newPass = prompt("Enter new password:");

                        setNewPassword(newPass);

                        handleSubmit(newPass);
                      }}
                    >
                      Change Password
                    </div>
                  </div>
                </li>
                <li className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">PIN</div>
                    <div className="flex items-center">
                      {localStorage.getItem("pin") ? (
                        <a
                          href="#"
                          className="ml-3 text-sm text-gray-400 hover:text-blue-500"
                          onClick={() => {
                            localStorage.removeItem("pin");
                            setPin("");
                          }}
                        >
                          Remove
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="ml-3 text-sm text-gray-400 hover:text-blue-500"
                          onClick={() => {
                            const newPin = prompt("Enter new PIN:");
                            if (newPin) {
                              localStorage.setItem("pin", newPin);
                              setPin(newPin);
                            }
                          }}
                        >
                          Set
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  Cookie.remove("token");
                  localStorage.removeItem("PROFILE_DATA");

                  window.location.href = "/auth/login";
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded focus:outline-none w-full"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
