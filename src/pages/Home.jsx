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
  useEffect(() => {
    if (Cookie.get("token")) {
      const data = localStorage.getItem("PROFILE_DATA");
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
    }

    axios
      .get("user/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })

      .then((res) => {
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
    subtitle.style.color = "#f00";
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
    // requesting money
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
      })
      .catch((err) => {
        // print the error message
        console.log(err.response.data.message);
        setMessage(err.response.data.message);
      });

    // alert("hello");
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <Topbar title="SX Bank" />
      <div className="overflow-x-auto p-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {name}!</h1>
        </div>

        <div>
          <section className="container">
            <div class="flex-col w-full border border-gray-300 rounded-lg shadow-md p-4 m-1">
              <div className="flex justify-center items-center p-4">
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
                  className="flex flex-col justify-center items-center text-center w-full md:w-48 "
                  style={{
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="h-6 mb-2"
                    src={money_transfer}
                    alt=""
                    width={30}
                  />
                  <p className="text-xs md:text-base">Transfer Money</p>
                </Link>
              </div>
              <div class="flex w-full justify-around overflow-x-auto p- bg-[#f2faff]">
                <Widget_card
                  card_text={"Wallet Balance :" + amount}
                ></Widget_card>
                <Widget_card card_text={"Wallet ID :" + wallet}></Widget_card>
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
                  <h1 className="text-xl font-bold text-start text-blue-500">
                    Available balance - 3000{" "}
                  </h1>
                </div>

                <form onSubmit={requesMoneyFunction}>
                  <div className="mb-1 mt-4">
                    <h1>
                      Request Money to{" "}
                      <span className="font-bold"> SX Bank</span>
                    </h1>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    ></label>
                    <input
                      style={{
                        border: "1px solid rgba(189, 189, 189, 1)",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "10px",
                      }}
                      className="w-full py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline appearance-none"
                      id="username"
                      type="number"
                      placeholder="Enter Amount to withdraw"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className="flex justify-even overflow-x-auto w-full text-center ">
                      <div
                        className="flex border border-solid border-gray-400 rounded-lg p-2 m-2 text-lg cursor-pointer"
                        onClick={() => setAmount(Number(amount) + Number(100))}
                      >
                        ₹100
                      </div>
                      <div
                        className="flex border border-solid border-gray-400 rounded-lg p-2 m-2 text-lg cursor-pointer"
                        onClick={() => setAmount(Number(amount) + Number(200))}
                      >
                        ₹200
                      </div>
                      <div
                        className="flex border border-solid border-gray-400 rounded-lg p-2 m-2 text-lg cursor-pointer"
                        onClick={() => setAmount(Number(amount) + Number(1000))}
                      >
                        ₹1000
                      </div>
                      <div
                        className="flex border border-solid border-gray-400 rounded-lg p-2 m-2 text-lg cursor-pointer"
                        onClick={() => setAmount(Number(amount) + Number(2000))}
                      >
                        ₹2000
                      </div>
                    </div>
                    <p className="text-red-500 mt-3 text-center">{message}</p>
                    <p className="text-green-700 mt-3 text-center">{success}</p>
                  </div>
                  <button
                    class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
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
    </div>
  );
}
