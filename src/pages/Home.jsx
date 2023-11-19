import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import logo from "../img/logo.png";
import axios from "../api/axios";
import logo2 from "../img/icons/logo2.png";
import money_transfer from "../img/money-transfer.png";
import add_money from "../img/income.png";
import request_money from "../img/cash-withdrawal.png";
import Topbar from "../components/Topbar";

import Widget_card from "../components/Widget_card";
import ChipsAmount from "../components/chipsAmount";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import toast, { Toaster } from "react-hot-toast";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ChargingStationOutlinedIcon from "@mui/icons-material/ChargingStationOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import numberToWords from "number-to-words";
export default function Home() {
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
  const [walletno, setWalletno] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);


// Note: Ensure that the states you are keeping are used appropriately throughout your component.

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };
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
  useEffect(() => {
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }

    if (localStorage.getItem("PROFILE_DATA") != null) {
      const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));

   

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
              setOtp("");

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
      icon: (
        <AddCardOutlinedIcon
          style={{
            color: "white",
            fontSize: 20,
          }}
        />
      ),
      func: openModal,
    },
    {
      name: "withdrawal",
      icon: (
        <AttachMoneyIcon
          style={{
            color: "white",
            fontSize: 20,
          }}
        />
      ),
      func: requestMoneyModal,
    },
    {
      name: "Transfer Money",
      icon: (
        <CurrencyExchangeOutlinedIcon
          style={{
            color: "white",
            fontSize: 20,
          }}
        />
      ),
      func: transferMOney,
    },
    {
      name: "Mobile Recharge",
      icon: (
        <ChargingStationOutlinedIcon
          style={{
            color: "white",
            fontSize: 20,
          }}
        />
      ),
      // func: transferMOney,
    },
  ];

  const checkPin = () => {
    const pin = localStorage.getItem("pin");

    if (!pin) {
    } else {
      ("ff");
    }
  };

  const [pin, setPin] = useState("");

  
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pin) {
      toast.error("Please enter the pin");
      return;
    }

    if (pin.length < 4) {
      toast.error("Pin must be 4 digits");
      return;
    }

    // Save the pin to localStorage
    localStorage.setItem("pin", pin);

    // refresh the page
    window.location.reload();

    //

    // You can perform additional actions on form submission if needed
  };
  const formatCurrency = (value) => {
    // Format currency with commas
    return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };
  // Function to convert number to words
  const handleCheckBalance = () => {
    // Show the popup
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    // Close the popup
    setShowPopup(false);
  };
  const handlePinChange = (e) => {
    // Set the pin
    setPin(e.target.value);
    
  }
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <Topbar name={name} title="SXBank 🚀" />

      <Toaster></Toaster>

      <div className="overflow-x-auto overflow-y-auto  h-screen bg-[#121212] text-white">
        {localStorage.getItem("pin") ? (
          <div className="overflow-x-auto p- ">
            <div>
              <section className="container ">
                <div className="text-start flex px-1 flex-col gap-2 font-[600] text-white">
                  {showPopup && (
                    <div className="fixed top-0 left-0  w-full h-full bg-black bg-opacity-10 flex items-center justify-center z-20 ">
                      <div className="bg-slate-400 p-4 rounded-md">
                        <div className="flex  items-center justify-between">
                          <div className="text-start text-xl font-[600] text-white">
                            Balance
                          </div>
                          <button
                            className=" rounded-md text-black"
                            onClick={handleClosePopup}
                          >
                            <CancelOutlinedIcon />
                          </button>
                        </div>
                        <div className="text-xl mt-10">
                          ₹{formatCurrency(wallet_balance)}
                        </div>
                        <div className="text-md text-white">
                          {numberToWords
                            .toWords(wallet_balance)
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}{" "}
                          Rupees Only
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full mt-5 px-2 flex justify-between items-center placeholder-slate-100 pt-2 pb-5">
                  <div className="grid grid-cols-3 gap-4 items-center justify-center">
                    {cards.map((card, index) => (
                      <div className="flex  flex-col items-center justify-between px-1">
                        <div
                          key={index}
                          onClick={card?.func}
                          className={
                            "bg-[#2c2c3c] w-[60px] h-[60px] rounded-full border border-[#17173b] px-1 overflow-hidden flex flex-col justify-center items-center"
                          }
                        >
                          {card.icon}
                        </div>
                        <p className="font-medium text-white pt-2 text-center capitalize text-[13px]">
                          {card.name}
                        </p>
                      </div>
                    ))}
                    <div
                      className="flex  flex-col items-center justify-between px-1 "
                      onClick={handleCheckBalance}
                    >
                      <div className="bg-[#2c2c3c] w-[60px] h-[60px] rounded-full border border-[#17173b] px-1 overflow-hidden flex flex-col justify-center items-center">
                        <AccountBalanceWalletOutlinedIcon />
                      </div>
                      <p className="font-medium text-white pt-2 text-center capitalize text-[13px]">
                        Check Balance
                      </p>
                    </div>
                  </div>
                </div>

                {/* <Widget_card card_text={"Wallet ID: " + wallet} /> */}

                <CustomModal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  afterOpenModal={afterOpenModal}
                  contentLabel="Example Modal"
                >
                  <section className="rounded-md p-4 border border-gray-300">
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
                </CustomModal>

                <CustomModal
                  isOpen={requestMoney}
                  onRequestClose={closeRequestMoneyModal}
                  afterOpenModal={afterOpenModal}
                  contentLabel="Request Money Modal"
                >
                  <section className="">
                    <form onSubmit={requesMoneyFunction}>
                      <h1 className="pb-2 font-black text-center text-black">
                        Withdraw Amount
                      </h1>
                      <div className="mb-1 mt-4">
                        <div className="relative w-full">
                          <label htmlFor="amount" className="sr-only">
                            Enter Amount
                          </label>
                          <input
                            class="appearance-none w-full placeholder:bg-transparent border  md:w-2/3  rounded-md py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="username"
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter Amount"
                            value={amount}
                          />
                        </div>
                        {/* </div> */}

                        <div className="flex mt-2 mb-4 justify-even overflow-x-auto w-full text-center ">
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
                        className="bg-[#1c1c64] w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        type="submit"
                        // disabled={isLoading}
                      >
                        Request Money
                      </button>
                    </form>
                    <hr />
                  </section>
                </CustomModal>
              </section>
            </div>
            {/* debit card */}
            <div className="border w-auto  border-teal-50 text-white p-5 rounded-lg shadow-2xl mx-2 debit-card-bg1">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-bold">Debit Card</p>
                <img className=" h-12" src={logo} alt="Logo" />
              </div>
              <p className="text-base">{name}</p>
              <p className="text-xl font-bold mb-2">{wallet}</p>
              <div className="flex justify-between mb-2 mt-6">
                <div>
                  <p className="text-[10px]">Expires</p>
                  <p className="text-lg font-bold">06/28</p>
                </div>
                <div>
                  <p className="text-base text-white">CVV</p>
                  <p className="text-lg font-bold text-white">668</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="m-2 h-full bg-red-100 border border-red-400 h-[100px] text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Hey User!</strong>
            <div className="flex justify-start items-center gap-2">
              <span className="block sm:inline text-1xl">
                Set Your Pin to use the Application
              </span>
              <button
                onClick={togglePopup}
                className="text-blue-700 text-1xl p-2 rounded-sm hover:bg-blue-100 focus:outline-none"
              >
                Set Pin
              </button>
            </div>
            <span
              className="absolute top-0 right-0 px-4 py-3 cursor-pointer"
              onClick={togglePopup}
            >
              <svg
                className="fill-current h-6 w-6 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>

            {/*pin  Popup */}
            {isPopupOpen && (
              <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
                <div className="bg-white w-[250px]  rounded-md ">
                  <div className="flex justify-between px-1 items-center">
                    <h2 className="text-base px-2 py-2 text-white font-semi  text-start ">
                      Set Your Pin
                    </h2>
                    <CloseOutlinedIcon
                      style={{
                        color: "black",
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "black",
                      }}
                    />
                  </div>

                  {/* set pin pop-up */}
                  <div className="w-full flex  items-center justify-center ">
                    <form onSubmit={handleSubmit}>



                      <input
                        type="number"
                        minLength={4}
                        placeholder="Enter your pin"
                        className="border w-full border-gray-400 rounded-md py-2 px-2"
                        value={pin}
                        onChange={handlePinChange}
                      />
                      <button
                        className="w-full mt-5 py-2 bg-blue-400 mb-2 text-white text-xl font-light rounded-md"
                        type="submit"
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

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
              <h2 className="text-[14px] font-bold mb-4 text-center text-black">
                Enter your OTP
              </h2>
              <form onSubmit={verifyOtp}>
                <div className="flex flex-col items-center justify-center mb-6">
                  <input
                    type="number"
                    className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                    placeholder="Enter OTP"
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
const CustomModal = ({
  isOpen,
  onRequestClose,
  afterOpenModal,
  children,
  contentLabel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={afterOpenModal}
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
      contentLabel={contentLabel}
    >
      {children}
    </Modal>
  );
};
