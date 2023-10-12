import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "./api/axios";
import Cookie from "js-cookie";
import logo from "./img/logo.png";
import { Link } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";

function App() {
  useEffect(() => {
    if (Cookie.get("token")) {
      window.location.href = "/home/home/user";
    }
  }, []);

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    if (!phone) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Enter your phone number");
    } else if (phone.length !== 10) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Enter a valid number");
    }

    axios
      .post("/auth/login", { phone_number: phone, password })
      .then((res) => {
        setLoading(false);
        toast.success(res?.data?.message);
        const user = res?.data?.user;

        Cookie.set("token", res?.data?.token);
        Cookie.set("user", JSON.stringify(user?.full_name));
        Cookie.set("user_id", JSON.stringify(user?.id));
        Cookie.set("role", user?.role);

        const profileData = JSON.stringify(user);

        if (localStorage.getItem("PROFILE_DATA") === null) {
          localStorage.setItem("PROFILE_DATA", profileData);
        }

        const redirectPath =
          user?.wallet_no == null ? "/auth/onboarding" : "/home/home/user";
        window.location.href = redirectPath;
        setIsSubmitting(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <Toaster />
      <div className="w-screen min-h-screen p-3 flex bg-[#bdc3c7] justify-center items-center">
        <div className="w-full md:w-[450px] p-5 border rounded-xl shadow-2xl flex items-start flex-col relative overflow-hidden bg-[#ecf0f1] ">
          <img src={logo} className="w-[140px]" alt="" />
          <form onSubmit={handleSubmit} className="w-full space-y-4 ">
            <div className="pb-3">
              <p className="text-xl capitalize text-gray-500 font-[200]">
                welcome back,
              </p>
              <h1 className="text-3xl font-[700]">Login Here</h1>
            </div>
            <div className="relative w-full">
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="number"
                className="w-full focus:bg-[#fff] px-4 py-4 border border-[#f2f2] rounded-md shadow-md bg-[#ffffff] outline-none"
                placeholder="Phone Number"
              />
            </div>
            <div className="relative w-full">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="w-full focus:bg-[#fff] px-4 py-4 border border-[#f2f2] rounded-md shadow-md bg-[#ffffff] outline-none"
                placeholder="PIN"
              />
            </div>
            <div className="text-end">
              <Link
                to="/forgot-password"
                className="text-[#3498db] font-[600] text-[14px]"
              >
                Forgot MPIN
              </Link>
            </div>
            <div className="">
              <button
                type="submit"
                className="w-full bg-violet-300 py-4 rounded-md shadow-md flex items-center justify-center space-x-1"
              >
                <span className="text-2xl text-black font-[700]">Login</span>
              </button>
            </div>
            <div className="relative bottom-2 pt-5">
              <div className="text-center">
                <p className="flex justify-center items-center text-center space-x-1">
                  <span className="font-light">Don't have an account?</span>
                  <Link
                    to="/auth/register"
                    className="text-[#3498db] text-center font-[600]"
                  >
                    Create One
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {isSubmitting && (
            <div className="absolute w-full h-full flex items-center justify-center backdrop-blur-sm top-0 left-0 bg-[#000000b5]">
              <ImSpinner2 className="animate-spin text-white text-5xl" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
