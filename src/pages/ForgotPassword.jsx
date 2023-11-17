import { useState, CSSProperties, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import Cookie from "js-cookie";
import Modal from "react-modal";
import logo from "../img/logo.png";
import BeatLoader from "react-spinners/BeatLoader";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import { ImSpinner2 } from "react-icons/im";
import { TfiAngleRight } from "react-icons/tfi";
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

    setIsSubmitting(true);

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
    // regex to check phone number is 10 digit or not
    if (!phone.match(/^[0-9]{10}$/)) {
      setLoading(false);

      setIsSubmitting(false);
      return toast.error("Please enter a valid phone number");
    }

    axios
      .post("/forgotpassword/forgotpassword", { phone })
      .then((response) => {
        setLoading(false);

        setIsSubmitting(false);
        toast.success(response.data.message);
        // setPhone("");
        setPinverifyModal(true);
      })
      .catch((error) => {
        setLoading(false);

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

        setIsSubmitting(false);
        toast.success(response.data.message);

        setPinverifyModal(false);
        setResetPasswordModal(true);
      })
      .catch((error) => {
        setLoading(false);

        setIsSubmitting(false);
        toast.error(error.response.data.message);
      });
  };

  const ResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      return toast.error("Please enter a password");
    }

    await axios
      .post("/forgotpassword/resetpassword", { phone, password })
      .then((response) => {
        setLoading(false);

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

        setIsSubmitting(false);
        toast.error(error.response.data.message);
      });
    setLoading(false);
  };
  return (
    <>
      {/* component */}
      <Toaster />
      {/* <Topbar title="Forgot Password" hideicon={"hidden"} /> */}

      <div className="w-screen min-h-screen p-5 flex justify-center items-center">
        <div className="w-full md:w-[400px] p-5 border rounded-xl shadow-xl flex items-center flex-col relative overflow-hidden  h-[95vh]">
          <img src={logo} className="w-[250px] mx-auto" alt="" />
          <form onSubmit={handleSubmit} className="pt-24 w-full">
            <div className="text-center">
              <h1 className="text-base font-[200]">Forgot Your Password ?</h1>
              <h1 className="text-4xl font-bold">Reset Now</h1>
            </div>
            <div className="relative w-full py-5">
              <input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                type="number"
                className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"

                placeholder="phone number"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-1"
              >
                <span className="text-2xl text-[#323232] font-[800]">
                  Send OTP
                </span>{" "}
                <TfiAngleRight className="bg-[#323232] text-white w-[60px] h-[60px] p-5 rounded-full" />
              </button>
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
        <div className="bg-white rounded-lg w-full sm:w-96 overflow-hidden">
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
          {loading ? (
            <div className="absolute w-full h-full flex items-center justify-center backdrop-blur-sm top-0 left-0 bg-[#000000b5]">
              <ImSpinner2 className="animate-spin text-white text-5xl" />
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </>
  );
}

export default ForgotPasswordPage;
