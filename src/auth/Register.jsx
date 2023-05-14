import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Cookie from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import logo from "../img/sxbank.jpg";
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
  const [progress, setProgress] = useState("Register");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress();
    setIsSubmitting(true);

    if ( !phone || !password) {
      setLoading(false);
      setProgress("Register");
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }
   
    if (!phone) {
      setLoading(false);
      setProgress("Register");
      setIsSubmitting(false);
      return toast.error("Please enter a phone number");
    }

    if (phone.length < 10 || phone.length > 10) {
      setLoading(false);
      setProgress("Register");
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false);
      setProgress("Register");
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

    if (!password) {
      setLoading(false);
      setProgress("Register");
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
        setProgress("Wait A Moment");
        setIsSubmitting(false);
        toast.success(res.data.message);

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setProgress("Register");
        setIsSubmitting(false);
        // toast.error(err.response.data.message);
        toast.error(err.response.data.message);

        // toast.error(err.response.data.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Toaster />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="flex justify-center p-4 items-center">
            <img
              src={logo}
              width={100}
              className="flex justify-center items-center rounded-xl"
              alt=""
              srcset={logo}
            />
          </div>
          <h2 className="text-3xl font-bold leading-tight text-black  sm:text-4xl">
            Sign Up
          </h2>
          <p className="mt-2 text-base text-gray-600 dark:text-gray-600 leading-4">
            Already have an account?
            <Link
              to={"../auth/login"}
              title
              className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700 "
            >
              Sign In
            </Link>
          </p>
          <form
            onSubmit={(e) => handleSubmit(e)}
            action="#"
            method="POST"
            className="mt-8"
          >
            <div className="space-y-5">
              {/* <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900 "
                >
                  Full Name
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="text"
                    placeholder="Enter You Full Name"
                    id="name"
                  />
                </div>
              </div> */}
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900 "
                >
                  Phone Number
                </label>
                <div className="mt-2.5">
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="number"
                    placeholder="Enter Your Phone Number"
                    id="name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900 "
                >
                  Password
                </label>
                <div className="mt-2.5">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                    type="password"
                    placeholder="Enter Your Password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                >
                  {isSubmitting ? "" : progress}
                  {""}
                  {loading && (
                    <BeatLoader
                      type="TailSpin"
                      color="#fff"
                      height={20}
                      width={20}
                      className="ml-2"
                    />
                  )}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Read our
                <span className="capitalize text-indigo-600">
                  {" "}
                  privacy policy{" "}
                </span>
                and
                <span className="capitalize text-indigo-600">
                  {" "}
                  terms of service
                </span>
                to{" "}
                <span
                  style={{
                    lineHeight: "1px",
                  }}
                >
                  {" "}
                  learn more
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
