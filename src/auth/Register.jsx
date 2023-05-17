import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import logo from "../img/sxbank.jpg";
import { ImSpinner2 } from "react-icons/im";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setIsSubmitting(true);

    if ( !phone || !password) {
      setLoading(false)
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }
   
    if (!phone) {
      setLoading(false)
      setIsSubmitting(false);
      return toast.error("Please enter a phone number");
    }

    if (phone.length < 10 || phone.length > 10) {
      setLoading(false)
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false)
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

    if (!password) {
      setLoading(false)
      setIsSubmitting(false);
    }
    axios
      .post("/auth/register", {
        phone_number: phone,
        password: password,
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
        <div className="w-full md:w-[400px] p-5 border rounded-xl shadow-xl flex items-center justify-center flex-col relative overflow-hidden">
          <img src={logo} className="w-[100px] shadow-md pt-5" alt="" />
          <form onSubmit={handleSubmit} className="pt-5 w-full space-y-8">
            <div>
              {/* <p className="texr-sm capitalize text-center text-gray-500 font-[200] pt-4">
                hi there,
              </p> */}
              <h1 className="text-4xl font-[600] text-start">Sign Up</h1>
            </div>
            <div className="relative w-full">
              <label
                htmlFor="phone"
                className="absolute text-sm -top-[10px] left-3 bg-white"
              >
                Phone
              </label>
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="number"
                className="w-full border placeholder:capitalize px-4 py-2 rounded-md outline-none focus:border-[#6600ff]"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="password"
                className="absolute text-sm -top-[10px] left-3 bg-white"
              >
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                className="w-full border px-4 py-2 rounded-md outline-none focus:border-[#6600ff]"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <div>
              <button className="w-full bg-[#6600ff] text-white p-2 hover:bg-[#000] transition-all text-xl rounded-md">
                Register
              </button>
            </div>
            <div className="relative bottom-2 ">
              <div className="text-center">
                <p className="flex justify-center items-center text-center space-x-1">
                  <span>Already have an account ?</span>
                  <Link
                    to={"/auth/register"}
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
