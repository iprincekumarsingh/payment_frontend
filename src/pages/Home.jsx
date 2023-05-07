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
              <div class="flex  md:flex-row justify-around items-center overflow-x-auto p- bg-[#f2faff]">
                <Widget_card
                 card_text={
                  "Wallet Balance: ₹" +
                  (Number.isInteger(wallet_balance)
                    ? wallet_balance.toLocaleString("en-IN", { style: "currency", currency: "INR" }).slice(0, -3)
                    : wallet_balance.toLocaleString("en-IN", { style: "currency", currency: "INR" }))
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
                  <h1 className="text-xl font-bold text-start text-blue-500">
                    Available balance -₹ {wallet_balance}
                  </h1>
                </div>

                <form onSubmit={requesMoneyFunction}>
                  <div className="mb-1 mt-4">
                    <h1 className="py-2">
                      Request Money to{" "}
                      <span className="font-bold">SX Bank</span>
                    </h1>

                    <div className=" p-4 rounded-md shadow-lg">
                      <div className="relative">
                        <label htmlFor="amount" className="sr-only">
                          Enter Amount
                        </label>
                        <input
                          id="amount"
                          name="amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="block w-full px-4 py-3 rounded-md bg-white  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          placeholder="Enter Amount"
                        />
                      </div>
                    </div>

                    <div className="flex justify-even overflow-x-auto w-full text-center ">
                      <ChipsAmount
                        setClick={() => setAmount(Number(amount) + Number(100))}
                        amount_chip={100}
                      ></ChipsAmount>
                      <ChipsAmount
                        setClick={() => setAmount(Number(amount) + Number(500))}
                        amount_chip={500}
                      ></ChipsAmount>
                      <ChipsAmount
                        setClick={() => setAmount(Number(amount) + Number(100))}
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
        <div className="w-full p-1 h-56 text-white transition-transform transform rounded-xl bg-gradient-to-b ">
          <a href="" target="_blank" rel="noopener noreferrer">
            <img
              className="w-full h-full rounded-xl"
              src="https://i.imgur.com/kGkSg1v.png"
              alt="Debit Card"
            />
            <div className="absolute top-8 px-8 w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Debit Card</p>
                  <p className="font-bold">{wallet}</p>
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
    </div>
  );
}
