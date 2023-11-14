import React, { useEffect } from "react";
import Modal from "react-modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "../api/axios";
import logo from "../img/sxbank.jpg";
import Cookie from "js-cookie";
import Topbar from "../components/Topbar";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
export default function Profile() {
  useEffect(() => {
    //checkk if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);

  const [ProfileModal, setProfileModal] = useState(false);
  let subtitle;
  function openProfileModal() {
    setProfileModal(true);
  }

  function ProfilecloseModal() {
    setProfileModal(false);
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      fullname == "" ||
      alertnativephone == "" ||
      accountnumber == "" ||
      ifsc == "" ||
      bankname == "" ||
      addhar == ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (addhar.length < 12 || addhar.length > 12) {
      toast.error("Please enter a valid aadhar number");
      return;
    }

    if (!addhar.match(/^[0-9]{12}$/)) {
      toast.error("Please enter a valid aadhar number");
      return;
    }
    // useEffect(() => {

    axios
      .put(
        "user/profile/update",
        JSON.stringify({
          fullname: fullname,
          alt_phone: alertnativephone,
          account_number: accountnumber,
          ifsc_code: ifsc,
          bank_name: bankname,
          aadhaar_number: addhar,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");
        ProfilecloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  useEffect(() => {
    if (localStorage.getItem("PROFILE_DATA") != null) {
      const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));
      setfullname(
        data.first_name + " " + data.middle_name + " " + data.last_name
      );
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

    axios
      .get("user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })

      .then((res) => {
        localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.data));
        setfullname(
          res.data.data.first_name +
            " " +
            res.data.data.middle_name +
            " " +
            res.data.data.last_name
        );
        setalertnativephone(res.data.data.alt_phone);
        setaccountnumber(res.data.data.account_number);
        setifsc(res.data.data.ifsc_code);
        setbankname(res.data.data.bank_name);
        setPhone(res.data.data.phone);
        setaddhar(res.data.data.aadhaar_number);
        setWallet(res.data.data.wallet_no);
        setName(res.data.data.fullname);
        // set first letter of name
        // setLetterFormat(res.data.data.fullname.charAt(0));

        // console.log(res.data.data.wallet_no);
        // setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, []);
  const logout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    Cookie.remove("role");
    localStorage.removeItem("PROFILE_DATA");

    window.location.href = "/";
  };

  const createWallet = () => {
    axios
      .post(
        "user/create/wallet",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // setWallet(res.data.data.wallet_id);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        // show error  toast
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen bg-[#ffff]">
      <Toaster />
      <h1 className=" text-black text-center py-2 text-xl border-b-2">
        Profile{" "}
      </h1>

      {/* header div profile name */}
      <div className="-1 pt-5 pb-2 px-3">
        <h1 className="text-black text-3xl font-bold">{fullname}</h1>
        <h1 className="text-gray-500 text-base font-bold">{phone}</h1>
      </div>
      <hr />

      <div className="-1 px-3 mt-2">
        <h1 className="text-black text-[16px]">Sx bank Savings Account</h1>
        <div>
          <div className="mt-2 flex gap-2 flex-shrink w-full text-start">
            <h1 className="text-black border w-[230px] py-1 -1 text-start px-1 rounded-lg">
              Account no: <span>{accountnumber}</span>
            </h1>
          </div>
          <div className="mt-2 flex gap-2 flex-shrink w-full">
            <h1 className="text-black border w-[220px] text-start px-1 rounded-lg">
              Wallet no: <span>{wallet}</span>
            </h1>
          </div>
          <div className="mt-2 flex gap-2 flex-shrink w-full">
            <h1 className="text-black border w-[220px] text-start px-1 rounded-lg">
              Aadhar no: <span>*********{addhar.slice(8, 12)}</span>
            </h1>
          </div>
        </div>
        <hr className="mt-3" />
        <div className="mt-2">
          <h1 className="text-black text-[16px]">Bank Information</h1>
          <div>
            <div className="mt-2 flex gap-2 flex-shrink w-full text-start">
              <h1 className="text-black border w-[230px] py-1 -1 text-start px-1 rounded-lg">
                Bank name : <span>{bankname}</span>
              </h1>
            </div>

            <div className="mt-2 flex gap-2 flex-shrink w-full">
              <h1 className="text-black border w-[220px] text-start px-1 rounded-lg">
                IFSC code: <span>{ifsc}</span>
              </h1>
            </div>
          </div>
        </div>

        <hr className="mt-5" />
        {/* tools */}
        {Cookies.get("role") === "admin" ? (
          <Link to={"../admin"}>
            <div className="mt-5 flex gap-3 items-center w-full  ">
              <div className="flex items-center justify-between w-full gap-3">
                <div className="flex items-center gap-3  ">
                  <AdminPanelSettingsOutlinedIcon />
                  <div className="flex flex-col ">
                    <h1 className="text-base font-normal ">Admin</h1>
                    <h1 className="text-[12px] text-gray-500">
                      Manage User & payments
                    </h1>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <KeyboardArrowRightOutlinedIcon />
                </div>
              </div>
            </div>
          </Link>
        ) : null}

        <Link to={"../../settings"}>
          <div className="mt-5 flex gap-3 items-center w-full  ">
            <div className="flex items-center justify-between w-full gap-3">
              <div className="flex items-center gap-3  ">
                <SettingsOutlinedIcon />
                <div className="flex flex-col ">
                  <h1 className="text-base font-normal ">Settings</h1>
                  <h1 className="text-[12px] text-gray-500">
                    Manage pin and more
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <div>
                <KeyboardArrowRightOutlinedIcon />
              </div>
            </div>
          </div>
        </Link>
        <div className="mt-5 flex gap-3 items-center w-full  ">
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center gap-3  ">
              <LogoutOutlinedIcon />
              <div className="flex flex-col ">
                <h1 className="text-base font-normal ">Logout</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
