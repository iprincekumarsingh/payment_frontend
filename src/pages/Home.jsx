import React, { useEffect } from "react";
import { useState } from "react";

// import image from assets folder
import add_money from "../img/add_money.svg";
import receive_money from "../img/receive_money.svg";
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
      shadow: "none",

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
            <div className="flex justify-center gap-[6rem]">
              <div onClick={openModal}>
                <div className="flex items-center justify-center w-10 h-5 mx-auto  rounded-full">
                  <img src={add_money} alt="" />
                </div>
                <h3 className="mt-8 text-1xl font-semibold text-black ">
                  Add Money
                </h3>
              </div>
              <div onClick={requestMoneyModal}>
                <div className="flex items-center justify-center w-10 h-5 mx-auto  rounded-full">
                  <img src={receive_money} alt="" />
                </div>
                <h3 className="mt-8 text-1xl font-semibold text-black ">
                  Request Money
                </h3>
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
            <section className="rounded-1xl p-4 border-[1px] border-black border-solid">
              <div className="flex-col justify-center items-center ">
                <hr />
                <h1 className="text-3xl font-bold text-center">Request Money</h1>
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
        </section>
      </div>
    </>
  );
}
