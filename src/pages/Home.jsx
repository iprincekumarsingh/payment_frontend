import React, { useEffect } from "react";
import { useState } from "react";

// import image from assets folder
import add_money from "../img/add_money.png";
import receive_money from "../img/receive_money.png";
import Modal from "react-modal";
import wallet from "../img/wallet.png";
import qrcode from "../img/qrcode.jpg";
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
  }, []);
  return (
    <>
      <div className=" mb-4  mt-2 ml-4 p-1">
        <h1 className="text-2xl  ">Welcome Back </h1>
        <span className="text-3xl text-black font-bold ">Prince </span>
      </div>
      <div>
        <section className="container  mt-10 border-[black]-100 h-3/4">
          <div className="  ">
            <div className="flex justify-around items-center m-4 gap-4 rounded-md shadow-2xl shadow-black-500/40 p-10 h-2/4 ">
              <div
                onClick={openModal}
                className="flex-col  justify-center items-center text-center  w-[200px] "
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
                  src="/src/img/add_money.png"
                  alt=""
                  width={50}
                />
                <p>Add Money</p>
              </div>

              <div
                onClick={requestMoneyModal}
                className="flex-col  justify-center items-center text-center w-[200px] "
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
                  src="/src/img/receive_money.png"
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
                <hr />
                <h1 className="text-2xl font-bold text-start text-blue-500">
                  Available balance - 10000{" "}
                </h1>
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                ></label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Enter Amount to withdraw"
                />
              </div>
              <button
                class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Request
              </button>
              <hr />
            </section>
          </Modal>
        </section>
      </div>
      <div>
        <section className="container mt-10 border-[black]-100 h-3/4">
          <div className="text-center"></div>
        </section>
      </div>
    </>
  );
}
