import React, { useEffect } from "react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import add_money from "../img/add_money.png";
import receive_money from "../img/receive_money.png";
import Modal from "react-modal";

import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import logo from "../img/sxbank.jpg";
import axios from "../api/axios";
import logo2 from "../img/icons/logo2.png";
import back_arrow from "../img/icons/back.png";
import money_transfer from "../img/money_transfer.png";
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

      setfullname(data.fullname);
      setalertnativephone(data.alt_phone);
      setaccountnumber(data.account_number);
      setifsc(data.ifsc_code);
      setbankname(data.bank_name);
      setPhone(data.phone);
      setaddhar(data.aadhaar_number);
      setWallet(data.wallet_no);
      setName(data.fullname);
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
        if (res.data.data.wallet_no == null) {
          window.location.href = "/auth/onboarding";
        }
        localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.data));

        setfullname(res.data.data.fullname);
        setalertnativephone(res.data.data.alt_phone);
        setaccountnumber(res.data.data.account_number);
        setifsc(res.data.data.ifsc_code);
        setbankname(res.data.data.bank_name);
        setPhone(res.data.data.phone);
        setaddhar(res.data.data.aadhaar_number);
        setWallet(res.data.data.wallet_no);

        setSplit_wallet(res.data.data.wallet_no.match(/.{1,4}/g).join(" "));

        setName(res.data.data.fullname);
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
      })
      .catch((err) => {
        console.log(err);
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
            console.log(res.data);
            // setMessage(res.data.error)
            console.log(res.data);
            setSuccess(res.data.message);

            setIsSubmitting(false);
            // timeout after 3 seconds
            setTimeout(() => {
              // setSuccess("");
              setAmount("");
              setSuccess("");

              setOtpModal(false);
            }, 3000);
          })
          .catch((err) => {
            // print the error message
            console.log(err.response.data.message);
            setMessage(err.response.data.message);
          });

        // if the otp is valid then send the money to the user
        console.log(res);
      })
      .catch((err) => {
        // console.log(err.response.data.message);
        // setOtpError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <Topbar title="SX Bank" />


      {/* check if the file is there or not  */}

      <div className="overflow-x-auto p-4">
        <div className="flex flex-col text-start items-start justify-center mb-8">
          <h1 className="text-3xl text-start font-bold mb-2">
            Welcome back, {name}!
          </h1>
        </div>

        {localStorage.getItem("PROFILE_DATA") != null ? (
          <div>
            <section className="">
              <div class="flex flex-col w-full border border-gray-300 rounded-lg shadow-md p-4 m-1">
                <div class="flex  md:flex-row justify-center items-center p-4">
                  <HomeIcons
                    onclickBtn={openModal}
                    icon={add_money}
                    text_p={"Add Money"}
                  />
                  <HomeIcons
                    onclickBtn={requestMoneyModal}
                    icon={receive_money}
                    text_p={"Request Money"}
                  />
                  <Link
                    to="/transfer/money"
                    class="flex flex-col justify-center items-center text-center w-full md:w-48"
                    style={{
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img
                      class="h-6 mb-2"
                      src={money_transfer}
                      alt=""
                      width={30}
                    />
                    <p class="text-xs md:text-base">Transfer Money</p>
                  </Link>
                </div>
                <div class="flex  md:flex-row justify-start items-center overflow-x-auto p-2 gap-2 bg-[#f2faff]">
                  <Widget_card
                    card_text={
                      "Wallet Balance: " +
                      (Number.isInteger(wallet_balance)
                        ? wallet_balance
                          .toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })
                          .slice(0, -3)
                        : wallet_balance.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }))
                    }
                  />
                  <Widget_card card_text={"Wallet ID: " + wallet} />
                </div>
              </div>

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
                            setAmount(Number(amount) + Number(100))
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
        ) : (
          <div className="bg-indigo-900 text-center py-2 lg:px-2">
            <div
              className="p-2  items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
              role="alert"
            >
              <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                Alert
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Complete your KYC to get full access to SX Bank
              </span>
              <svg
                className="fill-current opacity-75 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="mb-20" style={{ margin: "10px" }}>
        <h2 className="text-2xl p-4 font-semibold">Debit Card</h2>
        <div className="w-full p-1 h-56 text-white bg-[#242B2E] transition-transform transform rounded-xl bg-gradient-to-b ">
          <a href="" target="_blank" rel="noopener noreferrer">
            <div className="absolute top-8 px-8 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semi">Debit Card</p>
                  <p className="font-extrabold text-white">{wallet}</p>
                </div>
                <img className="w-14 h-14" src={logo} alt="Logo" />
              </div>
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {name}
              </a>
              <div className="flex justify-start my-2">
                {/* <p className="text-sm font-medium">Valid Thru</p> */}
                <p className="text-2xl font-medium my-2"></p>
              </div>
              <div className="flex justify-end">
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img className="w-14 h-14" src={logo2} alt="Logo" />
                </a>
              </div>
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
