import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import logo from "../img/logo.png";
import { ImSpinner2 } from "react-icons/im";
import { TfiAngleRight } from "react-icons/tfi";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Register() {
  let [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setIsSubmitting(true);

    if (!phone || !password) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }

    if (!phone) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a phone number");
    }

    if (phone.length < 10 || phone.length > 10) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

  //  password should be no only 4 digits
  // passwrod regex only numbers
  const passwordRegex = /^(?=.*\d)[\d ]+$/;
  if (!passwordRegex.test(password)) {
    setLoading(false);
    setIsSubmitting(false);
    return toast.error("Password should be only numbers");
  }
   


    axios
      .post("/auth/register", {
        phone_number: phone,
        password: password,
        first_name: firstname,
        last_name: lastname,
        middle_name: middlename,
        // fullname: name,
      })
      .then((res) => {
        setLoading(false);

        setIsSubmitting(false);
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setIsSubmitting(false);
        // toast.error(err.response.data.message);
        toast.error(err.response.data.message);

        // toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="w-screen min-h-screen p-5 flex justify-center items-center">
        <div className="w-full md:w-[400px] p-5 border rounded-xl shadow-xl flex items-center flex-col relative  bg-white h-[95vh]">
          <img src={logo} className="w-[250px] mx-auto" alt="" />
          <form onSubmit={handleSubmit} className="pt-20 w-full space-y-4">
            <div>
              {/* <p className="texr-sm capitalize text-center text-gray-500 font-[200] pt-4">
                hi there,
              </p> */}
              <h1 className="text-4xl font-[900] text-start">Register</h1>
            </div>
            <div className="relative w-full pt-10">
             
              <input
                onChange={(e) => {
                 setFirstname(e.target.value);
                }}
                value={firstname}
                type="text"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="First Name"
                required
              />
            </div>
            <div className="relative w-full p">
             
              <input
                onChange={(e) => {
                  setMiddlename(e.target.value);
                }}
                value={middlename}
                type="text"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="Middle Name"
                required
              />
            </div>
            <div className="relative w-full p">
             
              <input
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                value={lastname}
                type="text"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="relative w-full ">
              {/* <label
                htmlFor="phone"
                className="absolute text-sm -top-[10px] left-3 bg-white"
              >
                Phone
              </label> */}
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="number"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="relative w-full">
              {/* <label
                htmlFor="password"
                className="absolute text-sm -top-[10px] left-3 bg-white"
              >
                Password
              </label> */}
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="number"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="PIN"
                required
              />
            </div>
            <div className="pt-10">
              <button className="w-full flex items-center justify-center space-x-1">
                <span className="text-2xl text-[#323232] font-[800]">
                  Register
                </span>{" "}
                <TfiAngleRight className="bg-[#323232] text-white w-[60px] h-[60px] p-5 rounded-full" />
              </button>
            </div>
            <div className="relative bottom-2 pt-5">
              <div className="text-center">
                <p className="flex justify-center items-center text-center space-x-1">
                  <span>Already have an account ?</span>
                  <Link
                    to={"/auth/login"}
                    className="text-[#6600ff] text-center font-[600]"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {isSubmitting ? (
            <div className="absolute w-full h-full flex items-center justify-center backdrop-blur-sm top-0 left-0 bg-[#000000b5]">
              <ImSpinner2 className="animate-spin text-white text-5xl" />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
