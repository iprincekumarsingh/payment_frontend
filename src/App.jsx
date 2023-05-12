import { useState, CSSProperties, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "./api/axios";
import Cookie from "js-cookie";

import logo from "./img/sxbank.jpg";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";

function App() {
  useEffect(() => {
    if (Cookie.get("token")) {
      return (window.location.href = "/home/home/user");
    }
  }, []);

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [count, setCount] = useState(0);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [progress, setProgress] = useState("Login");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress();
    setIsSubmitting(true);

    if (!phone) {
      setLoading(false);
      setProgress("Login");
      setIsSubmitting(false);

      return toast.error("Please enter a phone number");
    }
    

    if (phone.length < 10 || phone.length > 10) {
      setLoading(false);
      setProgress("Login");
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }
    // regex to check phone number is 10 digit or not
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false);
      setProgress("Login");
      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

    axios
      .post("/auth/login", { phone_number: phone, password: password })
      .then((res) => {
        // if (res.data.status === "success") {
        setLoading(false);
        setProgress("Login");
        toast.success(res.data.message);
        Cookie.set("token", res.data.token);
        Cookie.set("user", JSON.stringify(res.data.user.full_name));
        Cookie.set("user_id", JSON.stringify(res.data.user.id));
        Cookie.set("role", JSON.stringify(res.data.user.role));
        console.log(res.data.user.phone);

        if (localStorage.getItem("PROFILE_DATA") != null) {
          localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.user));
        }

        if (res.data.user.wallet_no == null) {
          window.location.href = "/auth/onboarding";
        } else {
          window.location.href = "/home/home/user";
        }

        setIsSubmitting(false);
      })
      .catch((err) => {
        setLoading(false);
        setIsSubmitting(false);
        setProgress("Login");
        toast.error(err.response.data.message);
        // toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <>
      {/* component */}
      <Toaster />

      <div className="flex-col  justify-center items-center h-screen p-4">
        {/* <img src={logo} width={50} alt="" srcset="" /> */}
        <div className="flex  justify-center items-center h-screen ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
             <div className="flex justify-center p-4 items-center">
             <img src={logo} width={100}  className="flex justify-center items-center rounded-xl" alt="" srcset={logo} />
             </div>
            <h2 className="text-3xl flex font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-base text-gray-600  " style={{}}>
              Don't have an account?{" "}
              <Link
                to={"/auth/register"}
                title
                className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
              >
                Create a free account
              </Link>
            </p>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
              className="mt-8"
            >
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor
                    className="text-base font-medium text-gray-900 dark:text-gray-600"
                  >
                    Phone
                  </label>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border  bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 
                      dark:focus:ring-offset-gray-800"
                      type="number"
                      placeholder="80934XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor
                      className="text-base font-medium text-gray-900 dark:text-gray-600"
                    >
                      Password
                    </label>
                    <Link
                      to={"forgot-password"}
                      title
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline focus:text-indigo-700"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mt-2.5">
                    <input
                      className="flex h-10 w-full rounded-md border  bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
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
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="ml-2 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      />
                    </svg> */}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
