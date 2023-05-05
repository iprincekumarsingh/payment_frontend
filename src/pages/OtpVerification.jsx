import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Cookie from "js-cookie";
import axios from "../api/axios";
import BeatLoader from "react-spinners/BeatLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function OtpVerification() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {
    document.title = "Phone Login";

    if (Cookie.get("token")) {
      window.location.href = "/home/home/user";
    }
  });
  const location = useLocation();
  const phoneNumber = new URLSearchParams(location.search).get("phone");

  const [o1, setO1] = useState("");
  const [o2, setO2] = useState("");
  const [o3, setO3] = useState("");
  const [o4, setO4] = useState("");
  const [progress, setProgress] = useState("Verify OTP");

  const [otp, setOtp] = useState("");
  // setOtp(o1 + o2 + o3 + o4);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!otp) {
      setLoading(false);
      setProgress("Verify OTP");
      return toast.error("Please enter a OTP");
    }
    if (otp.length < 4 || otp.length > 4) {
      setLoading(false);
      setProgress("Verify OTP");
      return toast.error("Please enter a valid OTP");
    }
    // regex to check phone number is 4 digit or not
    if (!otp.match(/^[0-9]{4}$/)) {
      setLoading(false);
      setProgress("Verify OTP");
      return toast.error("Please enter a valid OTP");
    }

    axios
      .post("/auth/verify/phone", {
        phone: phoneNumber,
        code: otp,
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success("OTP verified successfully");
          const token = res.data.token;
          console.log(res);
          Cookie.set("token", token);
          Cookie.set("role", res.data.user.role);
          Cookie.set("name", res.data.user.fullname);
          localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.user));

          if (
            res.data.user.fullname == "" ||
            res.data.user.wallet_no == ""
          ) {
            window.location.href = "/auth/onboarding";
          } else {
            window.location.href = "/home/home/user";
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        setProgress("Verify OTP");
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <Toaster />
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Phone Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a OTP to your phone {phoneNumber}</p>
            </div>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  <div className="w-full h-16 border-black border-solid border-1 ">
                    <input
                      maxLength={4}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      placeholder="Enter OTP"
                      onChange={(e) => {
                        setOtp(e.target.value);
                        console.log(otp);
                      }}
                      value={otp}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={() => {
                        setProgress("");
                      }}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      {progress}
                      <BeatLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </button>
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
