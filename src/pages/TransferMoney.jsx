import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookie from "js-cookie";
import Modal from "react-modal";
import back_arrow from "../img/icons/back.png";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import ChipsAmount from "../components/chipsAmount";
import BeatLoader from "react-spinners/BeatLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function TransferMoney() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestMoney, setRequestMoney] = useState(false);
  const [transferHistory, setTransferHistory] = useState([]);
  const [pinverifyModal, setPinverifyModal] = useState(false);
  const [pin, setPin] = useState("");

  const [buttonMsg, setButtonMsg] = useState("Verify");
  const [isSubmitting, setIsSubmitting] = useState(false);

  let [loading, setLoading] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90%",
      padding: "10px",
      shadow: "none",
      border: "none",

      transform: "translate(-50%, -50%)",
    },
  };
  function requestMoneyModal() {
    setRequestMoney(true);
  }
  function closeRequestMoneyModal() {
    setErrorMessage("");
    setRequestMoney(false);
  }
  function requestPinVerify() {
    setPinverifyModal(true);
  }

  const onhandleClick = (e) => {
    e.preventDefault();

    if (!phone) {
      setErrorMessage("Please enter both phone number and amount");
      return;
    }

    axios
      .post(
        "transfer/checkUser",
        {
          phone: phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        setRequestMoney(true);
        if (!res) {
          setErrorMessage("User not found");
          return;
        }
        setErrorMessage("");
      })

      .catch((err) => {
        //  check the status code
        setErrorMessage(err.response.data.message);
      });
  };

  const checkingMoneyRequest = (e) => {
    e.preventDefault();

    if (!amount) {
      setErrorMessage("Please enter the amount");
      return;
    }
    // checking if the amount is greater than 10000
    if (amount > 10000) {
      setErrorMessage("Amount should be less than 10000");
      return;
    }

    // // checking if the pin is set or not
    // localStorage.setItem("pin", 1234);

    if (localStorage.getItem("pin") === null) {
      setErrorMessage("Please set your pin first");
      return;
    }
    setRequestMoney(false);
    requestPinVerify(true);
  };

  const VerifAppPin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setButtonMsg();
    // checking if the pin is correct or not
    if (pin !== localStorage.getItem("pin")) {
      setErrorMessage("Please enter the correct pin");
      setLoading(false);
      return;
    }

    if (pin === localStorage.getItem("pin")) {
      axios
        .post(
          "transfer/transferMoney",
          {
            phone: phone,
            amount: amount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + Cookie.get("token"),
            },
          }
        )
        .then((res) => {
          setPhone("");
          setAmount("");
          setPin("");
          setSuccessMessage("Money transferred successfully");
          setTimeout(() => {
            setSuccessMessage("");
          }, 1000);

          setPinverifyModal(false);
          setErrorMessage("");
          setLoading(false);
        })
        .catch((err) => {
          setErrorMessage(err.response.data.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 1000);
        });
    }

    // checking if the user has enough balance or not
  };
  const [load, setLoad] = useState(true);
  const getData = async () => {
    await axios
      .get("transfer/history", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        // console.log(res);
        // setLoad(false);
        setTransferHistory(res.data.transferHistory);
      })
      .catch((err) => {
        // setLoad(false);
      });
    setLoad(false);
  };
  useEffect(() => {
    getData();
  }, [successMessage, errorMessage]);
  const notificationListMap = transferHistory.map((item, index) => {
    return (
      <tr className=" border-b text-center text-xs" key={index}>
        <td className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">
          Transferred to : {item.receiver.phone}
          <tr>
            <td>Receiver Name : {item.receiver.name}</td>
          </tr>
          <tr>
            <td>Status :{item.status}</td>
          </tr>
        </td>
        <td className="whitespace-nowrap px-4 text-base py-2 text-gray-700">
          ₹ {item.amount}
        </td>
      </tr>
    );
  });

  return (
    <div className="overflow-hidden">
      <Topbar title="Money Transfer" backLink={"/home/home/user"} hideicon={"hidden"}></Topbar>

      <Modal
        isOpen={requestMoney}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeRequestMoneyModal}
        style={customStyles}
      >
        <section
          className="rounded-2xl p-4 z-[9999]"
          style={{ border: "1px solid rgba(189, 189, 189, 1)" }}
        >
          <div className="flex-col justify-center items-center ">
            <h1 className="text-1xl font-bold text-start text-blue-500"></h1>
          </div>

          <form onSubmit={(e) => checkingMoneyRequest(e)}>
            <div class="mb-4 mt-0">
              <h1 className="text-2xl p-2 font-semibold">Transfer Money</h1>
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              ></label>
              <input
                style={{
                  border: "1px solid rgba(189, 189, 189, 1)",
                  padding: "10px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                }}
                class=" appearance-none border-solid    w-full py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="number"
                placeholder="Enter Amount to Transfer"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
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
                  setClick={() => setAmount(Number(amount) + Number(2000))}
                  amount_chip={2000}
                ></ChipsAmount>
              </div>
              <p className="text-[#ff0000] mt-3 text-center">{errorMessage}</p>
              <p className="text-green-700 mt-3 text-center">
                {successMessage}
              </p>
            </div>
            <button
              class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Transfer Money
            </button>
          </form>
          <hr />
        </section>
      </Modal>
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
        // className="flex items-center justify-center"
        // overlayClassName="fixed inset-0 bg-black opacity-50 z-50"
      >
        <div className="bg-white rounded-lg w-full sm:w-96 z-[9999]">
          <div className="p-4">
            <h2 className="text-1xl font-bold mb-4 text-center">
              Enter your 4-digit UPI PIN
            </h2>
            <form onSubmit={VerifAppPin}>
              <div className="flex flex-col items-center justify-center mb-6">
                <input
                  type="text"
                  className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                />
                {errorMessage && (
                  <span className="text-red-500 text-sm">{errorMessage}</span>
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
          </div>
        </div>
      </Modal>

      <h2 className="text-2xl p-2">Recent Transactions</h2>
      <table className="min-w-full divide-y-2 text-center divide-gray-200 bg-white text-sm border-b">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap text-start px-4 py-2 font-medium text-gray-900">
              Transaction Details
            </th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Amount
            </th>
          </tr>
        </thead>
      </table>
      <div className="w-full h-[55vh] overflow-x-hidden overflow-y-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 text-center divide-gray-200 bg-white text-sm">
            <tbody class="divide-y divide-gray-200">
              {load
                ? "Loading..."
                : transferHistory?.length !== 0
                ? notificationListMap
                : "No Transaction Yet"}
            </tbody>
          </table>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          onhandleClick(e);
        }}
        className="bg-white fixed bottom-2 left-0 w-full"
      >
        {/* input form with border 1px */}
        <div class="flex flex-wrap justify-between shadow-lg mt-5 p-2">
          <input
            class="appearance-none w-full md:w-2/3 bg-gray-100 rounded-md py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="username"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            placeholder="Enter Phone Number"
          />
          <button class="appearance-none w-full md:w-1/3 text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md md:rounded-l-none mt-2 md:mt-0">
            Send Money
          </button>
        </div>

        <div className="flex flex-col mt-5">
          {successMessage && (
            <div className="flex justify-center items-center mb-3 px-4 py-3 bg-green-200 text-green-700 rounded-md">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-.293-5.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L10 13.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}
          {errorMessage && (
            <div className="flex justify-center items-center mb-3 px-4 py-3 bg-red-200 text-red-700 rounded-md">
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v4a1 1 0 01-2 0v-4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
