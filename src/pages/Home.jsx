import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Modal from "react-modal";
import logonew from "../img/logo.png";

import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import logo from "../img/sxbank.jpg";
import axios from "../api/axios";
import logo2 from "../img/icons/logo2.png";
import card_pin from "../img/icons/card_sim.png";

import money_transfer from "../img/money-transfer.png";
import add_money from "../img/income.png";

import request_money from "../img/cash-withdrawal.png";
import Topbar from "../components/Topbar";
import HomeIcons from "../components/HomeIcons";
import Widget_card from "../components/Widget_card";
import ChipsAmount from "../components/chipsAmount";
import { AiOutlineClose } from "react-icons/ai";
import CheckBalance from "../components/Models/CheckBalance";

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

    setMessag/e("Failed to send OTP,check Provider balance");
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

  const checkPin = () => {
    const pin = localStorage.getItem("pin");

    if (!pin) {
    } else {
      ("ff");
    }
  };

  return (
    <>
      <Topbar title="SXBank 🚀" />

      <div className="overflow-x-auto overflow-y-auto">
        {localStorage.getItem("pin") ? (
          <div className="overflow-x-auto p-4">
            <div>
              <section className="container">
                <div className="w-full flex justify-around placeholder-slate-100 pt-2 pb-5">
                  {cards?.map((card, index) => {
                    return (
                      <div
                        onClick={card?.func}
                        className={
                          "bg-[#fff] w-[100px] border p-5 overflow-hidden flex flex-col justify-center items-center rounded-2xl shadow-xl"
                        }
                      >
                        <img src={card?.img} className="w-[45px]" alt="" />
                        <p className="font-bold pt-2 text-center  capitalize text-[10px]">
                          {card?.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="text-center font-[600] bg-[#fff] border shadow-xl p-2 rounded-xl">
                  Available Balance: ₹{wallet_balance}
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
                        Scan the QR code to send money and share the screenshot
                        on WhatsApp.
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
                  <section className="">
                    {/* <div
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
                <AiOutlineClose className="text-2xl" />
              </div> */}

                    <form onSubmit={requesMoneyFunction}>
                      <div className="mb-1 mt-4">
                        <h1 className="pb-2 font-black text-center">
                          Withdraw Amount
                        </h1>

                        {/* <div className="p-4 rounded-md shadow-lg"> */}
                        <div className="relative w-full">
                          <label htmlFor="amount" className="sr-only">
                            Enter Amount
                          </label>
                          <input
                            class="appearance-none w-full md:w-2/3 bg-gray-100 rounded-md py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="username"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            value={amount}
                          />
                        </div>
                        {/* </div> */}

                        <div className="flex mt-2 mb-2 justify-even overflow-x-auto w-full text-center ">
                          <ChipsAmount
                            setClick={() =>
                              setAmount(Number(amount) + Number(100))
                            }
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
                        <p className="text-red-500 mt-3 text-center">
                          {message}
                        </p>
                        <p className="text-green-700 mt-3 text-center">
                          {success}
                        </p>
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
            <button className="mt-10  block group debit-card-bg1 rounded-xl overflow-hidden mb-20 rotate relative w-[90%] mx-auto h-56 transition-all duration-700">
              <div className="absolute  debit-card-bg1 div1 top-0 left-0 w-full h-56 text-black   shadow-md shadow-[#5d5d5d] transition-all transform rounded-xl bg-gradient-to-b p-5 overflow-hidden">
                <p className="font-black text-[#000000] text-xl ">Debit Card</p>
                <div className="flex justify-between">
                  <div>
                    <p className="font-black text-base">{fullname}</p>
                    <span className="">********</span>
                    {wallet?.slice(8)}
                  </div>
                  <div>
                    <img
                      className="w-14 h-14 rounded-md"
                      src={logo}
                      alt="Logo"
                    />
                  </div>
                </div>
                <div className="tracking-[12px] py-5 text-center font-black text-black relative bottom-1"></div>
                <div className="flex justify-between items-center relative bottom-2">
                  <div>
                    <p className="text-base font-black">Expires</p>
                    <p className="text-sm font-bold">10/27</p>
                  </div>
                  <div>
                    <img
                      className="w-14 h-14 invert rounded-md"
                      src={logo2}
                      alt="Logo"
                    />
                  </div>
                </div>
              </div>
              <div className="div2 absolute debit-card-bg1 w-full top-0 left-0 h-full rounded-xl pt-16 space-y-4">
                <h1 className="tracking-[7px] text-xl font-black">{wallet}</h1>
                <div className="bg-black text-white p-2">
                  <span className="font-bold">CVV: </span>
                  <span>463</span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <div
            class=" m-2  h-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong class="font-bold">Hey User!</strong>
            <div className="flex justify-start items-center  gap-2">
              <span class="block sm:inline text-1xl">
                Set Your Pin to you the Application{" "}
              </span>

              <Link
                to={"../../settings"}
                className="text-blue-700 text-1xl p-2 rounded-sm"
              >
                Set Pin
              </Link>
            </div>
            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                class="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}

        {/* check if the file is there or not  */}
        {/* <div className="p-5">
        <input
          type="text"
          className="w-full bg-[#fff] border shadow-xl px-4 py-3 rounded-xl outline-none focus:border-[#000]"
          placeholder="Enter Bill Name"
        />
      </div> */}

        {/* <Modal>
        <CheckBalance amount={wallet_balance} />
      </Modal> */}
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
    </>
  );
}
