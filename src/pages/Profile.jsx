import React, { useEffect } from "react";
import Modal from "react-modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import axios from "../api/axios";
import logo from "../img/sxbank.jpg";
import Cookie from "js-cookie";
import Topbar from "../components/Topbar";
export default function Profile() {
  useEffect(() => {
    //checkk if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90%",
      padding: "10px",
      shadow: "none",

      border: "none",

      transform: "translate(-50%, -50%)",
    },
  };

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

    axios
      .get("user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })

      .then((res) => {
        localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.data));
        setfullname(res.data.data.fullname);
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
    <>
      <Toaster />
      <Topbar title="Profile" />
      <div className="bg-gray-100 ">
        <div className="bg-white rounded-md  p-3 max-w-md mx-auto mt-1">
          <div className="text-start mt-4">
            <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
            <p className="text-gray-500 text-lg mt-2">{phone}</p>
          
          </div>
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">Name</span>
              <span className="text-lg font-semibold">{name}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">Phone</span>
              <span className="text-lg font-semibold">{phone}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">
                Alternative Phone
              </span>
              <span className="text-lg font-semibold">{alertnativephone}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">
                Aadhar Number
              </span>
              <span className="text-lg font-semibold">{addhar}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">
                Bank Name
              </span>
              <span className="text-lg font-semibold">{bankname}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">
                IFSC Code
              </span>
              <span className="text-lg font-semibold">{ifsc}</span>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-lg text-gray-600 font-medium">
                Wallet Number
              </span>
              <span className="text-lg font-semibold">{wallet}</span>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {/* <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
}
