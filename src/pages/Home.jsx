import React, { useEffect } from "react";
import { useState } from "react";

// import image from assets folder
import add_money from "../img/add_money.png";
import receive_money from "../img/receive_money.png";
import Modal from "react-modal";
import wallet from "../img/wallet.png";
import qrcode from "../img/qrcode.jpg";
import Cookie from "js-cookie";
import logo from "../img/sxbank.jpg";
import axios from "../api/axios";
import logo2 from "../img/icons/logo2.png";

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

  // const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));

  // setLocalData(data.wallet_no);
  useEffect(() => {
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
      //  get the fisrt letter of name
      // setLetterFormat(data.name.charAt(0));
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
        // split wallet by 4 digit space and set it
        setSplit_wallet(res.data.data.wallet_no.match(/.{1,4}/g).join(" "));



        setName(res.data.data.fullname);

        // set first letter of name
        // setLetterFormat(res.data.data.fullname.charAt(0));

        // console.log(res.data.data.wallet_no);
        // setCounter(counter + 1);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  }, []);
  let subtitle;
  useEffect(() => {
    //checkk if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);
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
          // console.log(res.data);

          //
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
    < >

      <div className="overflow-x-auto">

        <div className="flex-col mb-4 ml-4 p-1 mt-6">
          <h1 className="text-2xl  ">Welcome Back </h1>
          <span className="text-3xl text-black font-bold ">{name}</span>
          <div className="mt-2">Account no - {wallet}</div>

          {/* <h1 className="text-base">Account no - {localStorage.getItem}</h1> */}
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
        {wallet == undefined || wallet == "" ? (
          ""
        ) : (

       
            <div className="shadow p-2 mb-20">
              <h2 className="text-2xl p-4 font-semibold">Card</h2>
              <div className="w-[99%] p-1 h-56  bg-red-100 rounded-xl  text-white shadow-2xl transition-transform transform ">
                <img
                  className="relative object-cover w-full h-full rounded-xl"
                  src="https://i.imgur.com/kGkSg1v.png"
                />
                <div className="w-full px-8 absolute top-8">
                  <div className="flex justify-between items-center">
                    <div className>
                      <p className="font-medium">Debit Card</p>
                      <p className="font-bold">
                        {split_wallet}
                      </p>
                    </div>
                    <img className="w-14 h-14" src={logo} />
                  </div>
                  <div className="pt-1 flex justify-start ">
                    {/* <p className="text-sm font-medium">Valid Thru</p> */}
                  </div>
                  <p className="text-2xl font-medium">{name}</p>
                  <div className="pt-1  flex justify-end  ">
                    <img className="w-14 h-14" src={logo2} />
                  </div>
                </div>
              </div>
            </div>
         
        )}
      </div>
    </>
  );
}
