import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import logo from "../img/logo.png";
import Modal from "react-modal";
import InputField from "../components/InputField";

export default function Register() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "500px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsOpen(true);
  const afterOpenModal = () => {};
  const closeModal = () => {
    setIsOpen(false);
    setOtp("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSubmitting(true);

    if (!phone || !password || !email) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }

    if (!/^\S+@\S+\.\S+/.test(email)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid email");
    }

    if (phone.length !== 10 || !/^[0-9]{10}$/.test(phone)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid 10-digit phone number");
    }

    if (!/^(?=.*\d)[\d ]+$/.test(password)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Password should be only numbers");
    }

    axios
      .post("/auth/register", {
        phone_number: phone,
        password,
        first_name: firstname,
        last_name: lastname,
        middle_name: middlename,
        email,
      })
      .then((res) => {
        setLoading(false);
        setIsSubmitting(false);
        toast.success(res.data.message);
        localStorage.setItem("email", email);
        setTimeout(() => setIsOpen(true), 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setIsSubmitting(false);
        toast.error(err.response.data.message);
      });
  };

  const verifyMail = () => {
    const apiUrl = "/auth/verify";
    const data = {
      email: localStorage.getItem("email"),
      code: otp,
    };

    axios
      .put(apiUrl, data)
      .then((response) => {
        console.log("Verification successful:", response.data);
        toast.success("Verification successful");
        setTimeout(() => (window.location.href = "/auth/login"), 2000);
      })
      .catch((error) => {
        console.error("Verification failed:", error.response.data);
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <Toaster />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Email Verification"
      >
        <section className="rounded-2xl p-4 border border-gray-300">
          <div className="flex flex-col items-start">
            <h1 className="text-1xl font-bold mb-4">Email Verification</h1>
            <p className="text-sm text-gray-500 mb-4">
              We have sent an OTP to your email: {localStorage.getItem("email")}
            </p>
            <InputField
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              type="number"
              placeholder="Enter OTP"
            />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={verifyMail}
            >
              Verify
            </button>
          </div>
        </section>
      </Modal>
      <div className="w-screen min-h-screen p-3 flex bg-[#bdc3c7] justify-center items-center">
        <div className="w-full md:w-[450px] p-5 border rounded-xl shadow-2xl flex items-start flex-col relative overflow-hidden bg-[#ecf0f1]">
          <img src={logo} className="w-[140px]" alt="" />
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <h1 className="text-3xl font-[700]">Register</h1>
            <InputField
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
              type="text"
              placeholder="First Name"
              required
            />
            <InputField
              onChange={(e) => setMiddlename(e.target.value)}
              value={middlename}
              type="text"
              placeholder="Middle Name"
              required
            />
            <InputField
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
              type="text"
              placeholder="Last Name"
              required
            />
            <InputField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Enter your email"
              required
            />
            <InputField
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="number"
              placeholder="Enter your phone number"
              required
            />
            <InputField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="number"
              placeholder="PIN"
              required
            />
            <button className="w-full bg-violet-300 py-4 rounded-md shadow-md flex items-center justify-center">
              <span className="text-2xl text-black font-[700]">Register</span>
            </button>
            <div className="relative bottom-2 pt-5">
              <div className="text-center">
                <p className="flex justify-center items-center text-center space-x-1">
                  <span>Already have an account?</span>
                  <Link to="/auth/login" className="text-[#3498db] font-[600]">
                    Login
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
