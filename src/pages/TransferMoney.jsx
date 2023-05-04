import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Cookie from "js-cookie";
import Modal from "react-modal";

export default function TransferMoney() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [requestMoney, setRequestMoney] = useState(false);
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
    setRequestMoney(false);
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

      })

      .catch((err) => {
        setErrorMessage("User not found");
        console.log(err);
      });
  };
  return (
    <>
      <div className="mt-2 p-2 text-3xl font-medium text-start ">
        Money Transfer
      </div>
      <form
        onSubmit={(e) => {
          onhandleClick(e);
        }}
      >
        {/* input form with border 1px */}
        <div className="flex justify-around">
          {/* <div className="flex flex-col items-center justify-center"> */}
          <input
            style={{ width: "60%", border: "1px solid black" }}
            class=" appearance-none border-solid m-2  rounded-md  py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter Phone Number"
          />

          <button
            style={{
              width: "35%",
              border: "1px solid black",
              backgroundColor: "#1E3A8A",
              color: "white",
            }}
            class=" appearance-none border-solid m-2 text-1xl  rounded-md  py-5 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          >
            Send Money
          </button>
          {/* </div> */}
        </div>
        <p className="text-green-700 p-2 mt-1">{successMessage}</p>
        <p className="text-[#ff0000] p-2 mt-1">{errorMessage}</p>
      </form>
      <Modal
        isOpen={requestMoney}
        // onAfterOpen={afterOpenModal}
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
              <p className="text-[#ff0000] mt-3 text-center">{errorMessage}</p>
              <p className="text-green-700 mt-3 text-center">{successMessage}</p>
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
    </>
  );
}
