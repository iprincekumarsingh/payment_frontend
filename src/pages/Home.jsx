import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Modal from "react-modal";

import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import logo from "../img/sxbank.jpg";
import axios from "../api/axios";
import logo2 from "../img/icons/logo2.png";
import card_pin from "../img/icons/card_sim.png";

import money_transfer from "../img/pay.png";
import add_money from "../img/add.png";

import request_money from "../img/request.png";
import Topbar from "../components/Topbar";
import HomeIcons from "../components/HomeIcons";
import Widget_card from "../components/Widget_card";
import ChipsAmount from "../components/chipsAmount";

export default function Home() {
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
  const [requestMoney, setRequestMoney] = useState(false);
  const [money, setMoney] = useState([]);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [localData, setLocalData] = useState({});
  const [split_wallet, setSplit_wallet] = useState();
  const [fullname, setfullname] = useState("");
  const [name, setName] = useState("");
  const [alertnativephone, setalertnativephone] = useState("");
  const [accountnumber, setaccountnumber] = useState("");
  const [ifsc, setifsc] = useState("");
  const [bankname, setbankname] = useState("");
  const [addhar, setaddhar] = useState("");
  const [phone, setPhone] = useState("");
  const [wallet, setWallet] = useState("");
  const [counter, setCounter] = useState(0);
  const [letterFormat, setLetterFormat] = useState("");
  const [wallet_balance, setWallet_balance] = useState(0);
  useEffect(() => {
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }

    if (localStorage.getItem("PROFILE_DATA") != null) {
      const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));

      setfullname(
        data.first_name + " " + data.middle_name + " " + data.last_name
      );

      setalertnativephone(data.alt_phone);
      setaccountnumber(data.account_number);
      setifsc(data.ifsc_code);
      setbankname(data.bank_name);
      setPhone(data.phone);
      setaddhar(data.aadhaar_number);
      setWallet(data.wallet_no);
      setName(data.first_name);
      setWallet_balance(data.wallet_balance);
    }

    axios
      .get("user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })

      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.wallet_no == null) {
          window.location.href = "/auth/onboarding";
        }
        localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.data));

        setfullname(
          res.data.data.first_name +
            " " +
            res.data.data.middle_name +
            " " +
            res.data.data.last_name
        );
        setalertnativephone(res.data.data.alt_phone);
        setaccountnumber(res.data.data.account_number);
        setifsc(res.data.data.ifsc_code);
        setbankname(res.data.data.bank_name);
        setPhone(res.data.data.phone);
        setaddhar(res.data.data.aadhaar_number);
        setWallet(res.data.data.wallet_no);

        setSplit_wallet(res.data.data.wallet_no.match(/.{1,4}/g).join(" "));

        setName(
          res.data.data.first_name +
            " " +
            res.data.data.middle_name +
            " " +
            res.data.data.last_name
        );
        setWallet_balance(res.data.data.wallet_balance);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, []);
  let subtitle;

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

  useEffect(() => {
    document.title = "Home";
    async function fetchData() {
      axios
        .get("money/user/transcations", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        })
        .then((res) => {
          setMoney(res.data);
          if (localStorage.getItem("PROFILE_DATA") == null) {
            localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchData();
  }, []);

  //  render all the transcations
  const requesMoneyFunction = (e) => {
    e.preventDefault();

    if (amount === 0) {
      setMessage("Please enter the amount");
      return;
    }

    setRequestMoney(false);

    // sending a otp to the registered phone number

    axios
      .post(
        "money/user/send/Otp",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // setMessage(res.data.error)
        console.log(res.data);
        setSuccess(res.data.message);

        setTimeout(() => {
          setSuccess("");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setSuccess(err.response.data.message);
      });

    setOtpModal(true);
  };
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const [otpModal, setOtpModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let [loading, setLoading] = useState(false);

  const verifyOtp = (e) => {
    e.preventDefault();

    // checking the otp is valid or not
    axios
      .post(
        "money/user/verify/Otp",
        {
          otp,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        axios
          .post(
            "money/",
            {
              amount,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookie.get("token")}`,
              },
            }
          )
          .then((res) => {
            setSuccess(res.data.message);
            console.log(res.data.message);
            setIsSubmitting(false);
            setTimeout(() => {
              // setSuccess("");
              setAmount("");
              setSuccess("");

              setOtpModal(false);
            }, 2000);
          })
          .catch((err) => {
            console.log(err.response.data.error);
            setOtpError(err.response.data.error);
          });
      })
      .catch((err) => {
        setOtpError(err.response.data.error);
      });
  };

  const transferMOney = () => {
    window.location.href = "/transfer/money";
  };

  const cards = [
    {
      name: "add money",
      img: add_money,
      func: openModal,
    },
    {
      name: "withdrawal",
      img: request_money,
      func: requestMoneyModal,
    },
    {
      name: "Transfer",
      img: money_transfer,
      func: transferMOney,
    },
  ];

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <Topbar title="SX Bank" />

      {/* check if the file is there or not  */}

      <div className="overflow-x-auto p-4">
        <div className="flex flex-col text-start items-start justify-center px-2">
          <p className="text-[16px] text-start">Welcome back,</p>
          <p className="font-black sm:text-xl md:text-2xl text-[#312aff]">
            {name}
          </p>
        </div>

        <div>
          <section className="container pt-5">
            <div className="w-full flex justify-around">
              {cards?.map((card, index) => {
                return (
                  <div
                    onClick={card?.func}
                    className={
                      "bg-white w-[100px] border p-5 overflow-hidden flex flex-col justify-center items-center rounded-md shadow-md"
                    }
                  >
                    <img src={card?.img} className="w-[25px]" alt="" />
                    <p className="font-bold pt-2 text-center  capitalize text-[10px]">
                      {card?.name}
                    </p>
                  </div>
                );
              })}
            </div>

            <Widget_card card_text={"Wallet ID: " + wallet} />

            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
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
                },
              }}
              // contentLabel="Request Money Modal"
              contentLabel="Example Modal"
            >
              <section className="rounded-2xl p-4 border border-gray-300">
                <div className="flex flex-col items-center">
                  <h1 className="text-3xl font-bold text-center mb-4">
                    Send Money
                  </h1>
                  <img
                    className="w-full max-w-sm mb-4"
                    src={qrcode}
                    alt="QR code"
                  />
                  <p className="text-sm text-gray-500 mb-4">
                    Scan the QR code to send money and share the screenshot on
                    WhatsApp.
                  </p>
                  <button
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </section>
            </Modal>

            <Modal
              isOpen={requestMoney}
              onAfterOpen={afterOpenModal}
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
              contentLabel="Request Money Modal"
            >
              <section className="border ">
                <div
                  className="flex justify-end"
                  onClick={(e) => {
                    e.preventDefault();
                    setRequestMoney(false);
                    setAmount("");
                    setOtp("");
                    setOtpError("");
                    setSuccess("");
                  }}
                >
                  {" "}
                  X
                </div>
                <div className="flex-col justify-center items-center">
                  <h1 className="text-1xl font-bold text-start text-blue-500">
                    Available balance -₹ {wallet_balance}
                  </h1>
                </div>

                <form onSubmit={requesMoneyFunction}>
                  <div className="mb-1 mt-4">
                    <h1 className="py-2 p-2">
                      Request Money to{" "}
                      <span className="font-bold">SX Bank</span>
                    </h1>

                    {/* <div className="p-4 rounded-md shadow-lg"> */}
                    <div className="relative p-2">
                      <label htmlFor="amount" className="sr-only">
                        Enter Amount
                      </label>
                      <input
                        class="appearance-none w-full md:w-2/3 bg-gray-100 rounded-md py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="username"
                        type="text"
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter Amount"
                        value={amount}
                      />
                    </div>
                    {/* </div> */}

                    <div className="flex mt-2 mb-2 justify-even overflow-x-auto w-full text-center ">
                      <ChipsAmount
                        setClick={() => setAmount(Number(amount) + Number(100))}
                        amount_chip={100}
                      ></ChipsAmount>
                      <ChipsAmount
                        setClick={() => {
                          setAmount(Number(amount) + Number(500));
                          console.log(amount);
                        }}
                        amount_chip={500}
                      ></ChipsAmount>
                      <ChipsAmount
                        setClick={() =>
                          setAmount(Number(amount) + Number(1000))
                        }
                        amount_chip={1000}
                      ></ChipsAmount>
                      <ChipsAmount
                        setClick={() =>
                          setAmount(Number(amount) + Number(2000))
                        }
                        amount_chip={2000}
                      ></ChipsAmount>
                    </div>
                    <p className="text-red-500 mt-3 text-center">{message}</p>
                    <p className="text-green-700 mt-3 text-center">{success}</p>
                  </div>
                  <button
                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    // disabled={isLoading}
                  >
                    Request Money
                  </button>
                </form>
                <hr />
              </section>
            </Modal>
          </section>
        </div>
      </div>
      <div className="mb-20" style={{ margin: "10px" }}>
        <h2 className="text-2xl p-4 font-semibold">Debit Card</h2>
        <div className="w-full p-1 h-56 text-white debit-card-bg1 transition-transform transform rounded-xl bg-gradient-to-b ">
          <a href="#">
            <div className="absolute top-8 px-8 w-full">
              <div className="flex  justify-between mb-3 my-2">
                <a href="#">
                  <img
                    className="w-14 h-14"
                    src={card_pin}
                    width={20}
                    alt="Logo"
                  />
                </a>
                <a href="#">
                  <img className="w-14 h-14 invert" src={logo2} alt="Logo" />
                </a>
              </div>
              <div className="flex justify-end"></div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semi">Debit Card</p>
                  <p className="font-extrabold text-white">{wallet}</p>
                </div>
                <img className="w-14 h-14 invert" src={logo} alt="Logo" />
              </div>
              <p>{fullname}</p>
            </div>
          </a>
        </div>
      </div>
      <Modal
        isOpen={otpModal}
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
        // className="flex items-center justify-center"
        // overlayClassName="fixed inset-0 bg-black opacity-50 z-50"
      >
        <div className="bg-white rounded-lg w-full sm:w-96">
          <div
            className="flex justify-end"
            onClick={(e) => {
              e.preventDefault();
              setOtpModal(false);
              setAmount("");
              setOtp("");
              setOtpError("");
              setSuccess("");
            }}
          >
            {" "}
            X
          </div>
          <div className="p-4">
            <h2 className="text-[14px] font-bold mb-4 text-center">
              An OTP has been sent to registered mobile number
            </h2>
            <form onSubmit={verifyOtp}>
              <div className="flex flex-col items-center justify-center mb-6">
                <input
                  type="text"
                  className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter 4 digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && (
                  <span className="text-red-500 text-sm">{otpError}</span>
                )}
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
            <p className="text-green-700 mt-3 text-center">{success}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
