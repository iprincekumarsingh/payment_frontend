import { useState, CSSProperties, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "./api/axios";
import Cookie from "js-cookie";

import logo from "./img/sxbank.jpg";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

function App() {
  useEffect(() => {
    if (Cookie.get("token")) {
      return (window.location.href = "/home/home/user");
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    if (!phone) {
      setLoading(false);
      setProgress("Login");
      setIsSubmitting(false);

      return toast.error("Please enter a phone number");
    }

    if (phone.length < 10 || phone.length > 10) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    // regex to check phone number is 10 digit or not
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    // alert(phone)
    axios
      .post("/auth/login", { phone_number: phone, password: password })
      .then((res) => {
        // if (res?.data?.status === "success") {
        setLoading(false);
        toast.success(res?.data?.message);
        Cookie.set("token", res?.data?.token);
        Cookie.set("user", JSON.stringify(res?.data?.user?.full_name));
        Cookie.set("user_id", JSON.stringify(res?.data?.user?.id));
        Cookie.set("role", res?.data?.user?.role);
        if (localStorage.getItem("PROFILE_DATA") != null) {
          localStorage.setItem("PROFILE_DATA", JSON.stringify(res?.data?.user));
        }

        if (res?.data?.user?.wallet_no == null) {
          window.location.href = "/auth/onboarding";
        } else {
          window.location.href = "/home/home/user";
        }

        setIsSubmitting(false);
        // } else {
        //   console.log(res);
        // }
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      <Toaster />
      <div className="w-screen min-h-screen p-5 flex justify-center items-center">
        <div className="w-full md:w-[400px] p-5 border rounded-xl shadow-xl flex items-center justify-center flex-col relative overflow-hidden">
          <img src={logo} className="w-[100px] shadow-md pt-5" alt="" />
          <form onSubmit={handleSubmit} className="pt-5 w-full space-y-8">
            <div>
              <p className="texr-sm capitalize text-center text-gray-500 font-[200] pt-4">
                hi there,
              </p>
              <h1 className="text-4xl font-[600] text-center">Sign In</h1>
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
                Login
              </button>
            </div>
            <div className="relative bottom-2 ">
              <div className="text-center">
                <p className="flex justify-center items-center text-center space-x-1">
                  <span>Don't have an account?</span>
                  <Link
                    to={"/auth/register"}
                    className="text-[#6600ff] text-center font-[600]"
                  >
                    Create One
                  </Link>
                </p>
              </div>
              <div>
                <Link
                  to={"/forgot-password"}
                  className="text-[#6600ff] text-center block font-[600]"
                >
                  Forgot Password
                </Link>
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

export default App;
