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
        {/* <section className="container  mt-10 border-[black]-100 h-3/4">
          <div className="  ">
            <div className="flex justify-center gap-[6rem]" onClick={openModal}>
              <div>
                <div className="flex items-center justify-center w-10 h-5 mx-auto  rounded-full">
                  <img src={add_money} alt="" />
                </div>
                <h3 className="mt-8 text-1xl font-semibold text-black ">
                  Add Money
                </h3>
              </div>
              <div>
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
            <section className="rounded-3xl border-[1px] border-black border-solid">
              <div className="p-8 text-start sm:p-12">
                <p className="text-sm font-semibold uppercase tracking-widest ">
                  <h1 className="text-[20px]">Wallet Balance - 400</h1>
                </p>
                <div className="mb-10">
                  <h2 className="mt-10 text-2xl font-sans">
                    Add money to wallet
                  </h2>
                  <div className=" border-[1px] border-black border-solid rounded-lg  mt-2">
                    <input
                      className=" font-sans w-full text-3xl rounded-lg border-black-200 p-4 pe-12  shadow-sm"
                      placeholder="Enter password"
                      type="number"
                      value={1000}
                    />
                  </div>
                </div>

                <a className="mt-8 font-sans text-center inline-block w-full rounded-lg bg-[#2827CC] py-4 text-sm font-bold text-white shadow-xl">
                  Add Amount
                </a>
              </div>
            </section>
          </Modal>
        </section> */}

        <div className="flex-col justify-center items-center ">

          <hr />
          <h1 className="text-3xl font-bold text-center">Send Money</h1>
          <img className="ite" src={qrcode} alt="" srcset="" />
          <p className="p-2 text-start mr-4 ml-4">
            Your Money will be updated in 5 to 10 min in your wallet
          </p>
        </div>
        <hr />
      </div>
    </>
  );
}
