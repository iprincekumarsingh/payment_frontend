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
// react modal
import Modal from "react-modal";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Register() {
  Modal.setAppElement("#root");

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
  let [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setAmount(0);
    setMessage("");
    setSuccess("");
    setOtpError("");
  }

  function requestMoneyModal() {
    setRequestMoney(true);
  }
  function closeRequestMoneyModal() {
    setRequestMoney(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setIsSubmitting(true);

    if (!phone || !password) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please fill all the fields");
    }

    // check mail
    if (!email) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a email");
    }

    // verify email
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setLoading(false);
      setIsSubmitting(false);
      return toast.error("Please enter a valid email");
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
        email: email,
        // fullname: name,

        // set email id in local storage
      })
      .then((res) => {
        setLoading(false);

        setIsSubmitting(false);
        toast.success(res.data.message);
        localStorage.setItem("email", email);

        setTimeout(() => {
          // window.location.href = "/auth/login";
          // modal open
          setIsOpen(true);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);

        setIsSubmitting(false);

        toast.error(err.response.data.message);
      });
  };

  const verifymail = () => {
    // put axios call here

    const apiUrl = "/auth/verify";

    // Data to be sent in the PUT
    //  request
    const data = {
      email: localStorage.getItem("email"),
      code: otp,
    };

    // Making the PUT request using axios
    axios
      .put(apiUrl, data)
      .then((response) => {
        // Handle successful response from the server
        console.log("Verification successful:", response.data);
        toast.success("Verification successful");
        
        // 2 sec then redirect to login
        setTimeout(() => {
          window.location.href = "/auth/login";
        }
        , 2000);
        
      })
      .catch((error) => {
        // Handle error from the server
        console.error("Verification failed:", error.response.data);
        toast.error(error.response.data.message);
      });

    // close modal
  };

  return (
    <>
      <Toaster></Toaster>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // shouldCloseOnOverlayClick={false}
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
            // marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            border: "1px solid rgba(189, 189, 189, 1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            // padding: "2rem",
            minWidth: "20rem",
            maxWidth: "80vw",
            // dont click on overlay to close modal
          },
        }}
        // contentLabel="Request Money Modal"
        contentLabel="Example Modal"
      >
        <section className="rounded-2xl p-4 border border-gray-300">
          <div className="flex flex-col items-st  ">
            <h1 className="text-1xl font-bold text-start mb-4">
              Email Verification
            </h1>

            <p className="text-sm text-gray-500 mb-4">
              We have send a otp on your mail id {localStorage.getItem("email")}
            </p>
            <div className="relative w-full">
              <label htmlFor="amount" className="sr-only">
                Enter Amount
              </label>
              <input
                class="appearance-none w-full m-2 md:w-2/3 bg-gray-100 rounded-md py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="username"
                type="number"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                placeholder="Enter OTP"
              />
            </div>
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={verifymail}
            >
              Verify
            </button>
          </div>
        </section>
      </Modal>
      <div className="w-screen min-h-screen p-5 flex justify-center items-center">
        <div className="w-full md:w-[400px] p-5 border rounded-xl shadow-xl flex items-center flex-col relative  bg-white h-[95vh]">
          <img src={logo} className="w-[250px] mx-auto" alt="" />
          <form onSubmit={handleSubmit} className="pt-4 w-full space-y-4">
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
            <div className="relative w-full ">
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
            <div className="relative w-full p">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="text"
                className="w-full focus:bg-[#fff] border px-4 py-2 rounded-xl shadow-md  bg-[#f1f1f1] outline-none"
                placeholder="Enter your email"
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
