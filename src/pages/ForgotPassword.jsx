import { useState, CSSProperties, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import Cookie from "js-cookie";
import Modal from "react-modal";
import logo from "../img/sxbank.jpg";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [pinverifyModal, setPinverifyModal] = useState(false);

  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (Cookie.get("token")) {
      return (window.location.href = "/home/home/user");
    }
  }, []);

  let [loading, setLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [phone, setPhone] = useState("");

  const [progress, setProgress] = useState("Login");
  function closeRequestMoneyModal() {
    setErrorMessage("");
    setRequestMoney(false);
  }
  function requestPinVerify() {
    setPinverifyModal(true);
  }
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
      .post("/forgotpassword/forgotpassword", { phone })
      .then((response) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.success(response.data.message);
        // setPhone("");
        setPinverifyModal(true);
      })
      .catch((error) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  const CheckOTP = (e) => {
    e.preventDefault();

    axios
      .post("/forgotpassword/checkotp", { phone, otp })
      .then((response) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.success(response.data.message);
        
        setPinverifyModal(false);
        setResetPasswordModal(true);
      })
      .catch((error) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  const ResetPassword = (e) => {
    e.preventDefault();

    if (!password) {
      return toast.error("Please enter a password");
    }

    axios
      .post("/forgotpassword/resetpassword", { phone, password })
      .then((response) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.success(response.data.message);
        setPhone("");
        setPinverifyModal(false);
        setResetPasswordModal(false);
        setPassword("");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
        setProgress("Login");
        setIsSubmitting(false);
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      {/* component */}
      <Toaster />

      <div className="flex-col  justify-center items-center h-screen p-4">
        <div className="flex  justify-center items-center h-screen ">
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
            <h2 className="text-2xl flex font-bold leading-tight text-black sm:text-2xl">
              Forgot Password
            </h2>
            <p
              className="mt-0 p-0 text-base  text-gray-600 invisible  "
              style={{}}
            >
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
                      placeholder="Give up your registered phone number."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "" : "Reset"}
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
      <Modal
        isOpen={pinverifyModal}
        onRequestClose={closeRequestMoneyModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "50",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            border: "1px solid rgba(189, 189, 189, 1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            minWidth: "20rem",
            maxWidth: "80vw",
          },
        }}
      >
        <div className="bg-white rounded-lg w-full sm:w-96">
          <div className="p-4">
            <h2 className="text-1xl font-bold mb-4 text-center">
              OTP Verification
            </h2>
            <form onSubmit={CheckOTP}>
              <div className="flex flex-col items-center justify-center mb-6">
                <input
                  type="text"
                  className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {""}
                  {/* check if the loading is true or not */}
                  {/* {loading && <Loader />} */}
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
            </form>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={resetPasswordModal}
        onRequestClose={closeRequestMoneyModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "50",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            border: "1px solid rgba(189, 189, 189, 1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            minWidth: "20rem",
            maxWidth: "80vw",
          },
        }}
      >
        <div className="bg-white rounded-lg w-full sm:w-96">
          <div className="p-4">
            <h2 className="text-1xl font-bold mb-4 text-center">
              Reset Password
            </h2>
            <form onSubmit={ResetPassword}>
              <div className="flex flex-col items-center justify-center mb-6">
                <input
                  type="text"
                  className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter  New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                  {""}
                  {/* check if the loading is true or not */}
                  {/* {loading && <Loader />} */}
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
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ForgotPasswordPage;
