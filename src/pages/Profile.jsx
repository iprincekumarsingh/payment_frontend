import React, { useEffect } from "react";
import Modal from "react-modal";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "../api/axios";
import logo from "../img/sxbank.jpg";
import Cookie from "js-cookie";
export default function Profile() {
  useEffect(() => {
    //checkk if the user is logged in or not
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }
  }, []);
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

  const [ProfileModal, setProfileModal] = useState(false);
  let subtitle;
  function openProfileModal() {
    setProfileModal(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function ProfilecloseModal() {
    setProfileModal(false);
  }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      fullname == "" ||
      alertnativephone == "" ||
      accountnumber == "" ||
      ifsc == "" ||
      bankname == "" ||
      addhar == ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (addhar.length < 12 || addhar.length > 12) {
      toast.error("Please enter a valid aadhar number");
      return;
    }

    if (!addhar.match(/^[0-9]{12}$/)) {
      toast.error("Please enter a valid aadhar number");
      return;
    }
    // useEffect(() => {

    axios
      .put(
        "user/profile/update",
        JSON.stringify({
          fullname: fullname,
          alt_phone: alertnativephone,
          account_number: accountnumber,
          ifsc_code: ifsc,
          bank_name: bankname,
          aadhaar_number: addhar,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast.success("Profile updated successfully");
        ProfilecloseModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
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
  const logout = () => {
    Cookie.remove("token");
    Cookie.remove("user");
    Cookie.remove("role");
    localStorage.removeItem("PROFILE_DATA");

    window.location.href = "/";
  };

  const createWallet = () => {
    axios
      .post(
        "user/create/wallet",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        // setWallet(res.data.data.wallet_id);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        // show error  toast
        toast.error(err.response.data.message);
      });
  };
  return (
    <>
      <Toaster />
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center item ">
            {/* <img src={back_arrow} className="h-8 mr-3" alt="Flowbite Logo" width={30} /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Profile
            </span>
          </a>
        </div>
      </nav>
      <div className="flex-col">
        {/* <div>{counter}</div> */}

        <div className="flex justify-start    items-start">
          <div className="flex-col items-start p-4 mt-3">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <h2 className="text-2xl font-semibold">{phone}</h2>
            <h2 className="text-2xl font-semibold">test@gmail.com</h2>
          </div>
        </div>

        <div
          className="flex "
          style={{
            background: "#03203C",
            margin: 10,
            border: "none",
            borderRadius: 3,
            color: "wheat",
            textAlign: "center",
            display: "flex",
          }}
        >
          <button
            style={{
              textAlign: "center",
              width: "100%",
              padding: 9,
              borderRadius: 30,
            }}
            onClick={openProfileModal}
          >
            Edit
          </button>
        </div>
        <div
          className="flex "
          style={{
            margin: 10,

            borderRadius: 3,
            color: "black",
            border: "1px solid #1C8D73",
            textAlign: "center",
            display: "flex",
          }}
        >
          <button
            style={{
              textAlign: "center",
              width: "100%",
              padding: 9,
              borderRadius: 30,
            }}
            onClick={() => {
              logout();
            }}
          >
            Logout
          </button>
        </div>
        {wallet == undefined ? (
          <div
            className="flex "
            style={{
              background: "#1C8D73",
              margin: 10,
              border: "none",
              borderRadius: 3,
              color: "wheat",
              textAlign: "center",
              display: "flex",
            }}
          >
            <button
              style={{
                textAlign: "center",
                width: "100%",
                color: "white",
                padding: 9,
                borderRadius: 30,
              }}
              onClick={() => {
                createWallet();
              }}
            >
              Create Wallet
            </button>
          </div>
        ) : (
          ""
        )}
      </div>{" "}
      {/* check if data is wpty or not */}
      {/* {wallet == undefined || wallet == "" ? (
        ""
      ) : (
        <div className="w-[99%] p-1 h-56  bg-red-100 rounded-xl  text-white shadow-2xl transition-transform transform ">
          <img
            className="relative object-cover w-full h-full rounded-xl"
            src="https://i.imgur.com/kGkSg1v.png"
          />
          <div className="w-full px-8 absolute top-8">
            <div className="flex justify-between">
              <div className>
                <p className="font-light">Name</p>
                <p className="font-medium tracking-widest">{fullname}</p>
              </div>
              <img className="w-14 h-14" src={logo} />
            </div>
            <div className="pt-1">
              <p className="font-light">Wallet Number</p>
              <p className="font-medium tracking-more-wider">{wallet}</p>
            </div>
          </div>
        </div>
      )} */}
      <Modal
        isOpen={ProfileModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={ProfilecloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="rounded-3xl border-[1px] border-black border-solid">
          <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex items-center justify-around max-w-lg text-center">
              <h1 className="text-[14px] text-start font-bold sm:text-3xl">
                Update Profile
              </h1>
              <button
                onClick={() => {
                  ProfilecloseModal();
                }}
              >
                X
              </button>
            </div>

            <form
              onSubmit={(e) => handleSubmit(e)}
              className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            >
              <div>
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm"
                    placeholder="Full Name"
                    onChange={(e) => setfullname(e.target.value)}
                    defaultValue={fullname}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Alternative Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Alternate Mobile Number"
                    onChange={(e) => setalertnativephone(e.target.value)}
                    defaultValue={alertnativephone}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Account Number"
                    onChange={(e) => setaccountnumber(e.target.value)}
                    defaultValue={accountnumber}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Bank Name"
                    onChange={(e) => setbankname(e.target.value)}
                    defaultValue={bankname}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="IFS Code"
                    onChange={(e) => setifsc(e.target.value)}
                    defaultValue={ifsc}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Aadhar Number"
                    onChange={(e) => setaddhar(e.target.value)}
                    defaultValue={addhar}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </section>
      </Modal>
    </>
  );
}
