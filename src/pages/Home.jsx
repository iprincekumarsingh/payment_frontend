import React, { useEffect } from "react";
import { useState } from "react";

// import image from assets folder
import add_money from "../img/add_money.png";
import receive_money from "../img/receive_money.png";
import Modal from "react-modal";
import wallet from "../img/wallet.png";
import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import axios from "../api/axios";

export default function Home() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90%",
      padding: "10px",
      shadow: "black",
      background: "white",
      border: "none",
      transform: "translate(-50%, -50%)",
    },
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [requestMoney, setRequestMoney] = useState(false);
  const [money, setMoney] = useState([]);
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
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
          console.log(res.data);

          //
          setMoney(res.data);


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

    if(amount ===0){
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
    <>
      <div className=" mb-4 ml-4 p-1 mt-6">
        <h1 className="text-2xl  ">Welcome Back </h1>
        <span className="text-3xl text-black font-bold ">
          {Cookie.get("name")}{" "}
        </span>
      </div>
      <div>
        <section className="container  mt-10 border-[black]-100 h-3/4">
          <div className="  ">
            <div className="flex justify-around items-center m-4 gap-4 rounded-md shadow-2xl shadow-black-500/40 p-10 h-2/4 ">
              <div
                onClick={openModal}
                className="flex-col  justify-center items-center text-center  w-[100px] "
                style={{
                  background: "rgb(202, 213, 226)",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img className="vertical-0" src={add_money} alt="" width={50} />
                <p>Add Money</p>
              </div>

              <div
                onClick={requestMoneyModal}
                className="flex-col  justify-center items-center text-center w-[100px] "
                style={{
                  background: "rgb(202, 213, 226)",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  className="vertical-0"
                  src={receive_money}
                  alt=""
                  width={50}
                />
                <p>Request Money</p>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <section className="rounded-1xl p-4 border-[1px] border-black border-solid">
              <div className="flex-col justify-center items-center ">
                <hr />
                <h1 className="text-3xl font-bold text-center">Send Money</h1>
                <img
                  className="justify-center items-center"
                  src={qrcode}
                  alt=""
                  srcset=""
                />
                <p className="p-2 text-start mr-4 ml-4 text-red-500">
                  send money on QR and Share the ss on Whatsapp no
                </p>
              </div>
              <hr />
            </section>
          </Modal>
          <Modal
            isOpen={requestMoney}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeRequestMoneyModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <section className="rounded-2xl p-4 border-[0.5px] border-black border-solid">
              <div className="flex-col justify-center items-center ">
                <h1 className="text-1xl font-bold text-start text-blue-500">
                  Available balance - 3000{" "}
                </h1>
              </div>

              <form
                onSubmit={(e) => {
                  requesMoneyFunction(e);
                }}
              >
                <div class="mb-4 mt-10">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  ></label>
                  <input
                    class=" appearance-none border-solid    w-full py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="number"
                    placeholder="Enter Amount to withdraw"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-[#ff0000] mt-3 text-center">{message}</p>
                  <p className="text-green-700 mt-3 text-center">{success}</p>
                </div>
                <button
                  class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Request
                </button>
              </form>
              <hr />
            </section>
          </Modal>
        </section>
      </div>
      <div>
        <div className="shadow p-2">
          <h2 className="text-2xl p-4 font-semibold">Transactions</h2>
          {/* {DataTable} */}
          {/* {JSON.stringify(money)} */}
        </div>
      </div>
    </>
  );
}
