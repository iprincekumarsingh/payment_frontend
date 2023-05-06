import React, { useEffect } from "react";
import axios from "../api/axios";
import Cookie from "js-cookie";
export default function OnBoarding() {
  const [fullname, setFullname] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [bankaccount, setBankaccount] = React.useState("");
  const [bankname, setBankname] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [aadhaar, setAadhaar] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [btn, setBtn] = React.useState("Update");

  useEffect(() => {
document.title = "Onboarding";
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }

    // get key PROFILE_DATA from localstorage and check that fullname and wallet_no is present or not
    const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));
    if (data.fullname !== "" && data.wallet_no !== "") {
      window.location.href = "/home/home/user";
    }
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setBtn("Updating...");
    setErrorMsg("");
    const data = {
      fullname,
      phone,
      bankaccount,
      bankname,
      ifsc,
      aadhaar,
    };
    console.log(data);

    if (!fullname || !phone || !bankaccount || !bankname || !ifsc || !aadhaar) {
      setErrorMsg("Please fill all the fields");
      setBtn("Update");
      return;
    }

    axios
      .put(
        "auth/onboarding/new_user",
        {
          fullname,
          alt_phone: phone,
          account_number: bankaccount,
          bank_name: bankname,
          ifsc_code: ifsc,
          aadhaar_number: aadhaar,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + Cookie.get("token"),
          },
        }
      )
      .then((res) => {
        setBtn("Update");
        setErrorMsg("");
        console.log(res.data.message);
        console.log(res.data.user);
        // localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.user));
        window.location.href = "/home/home/user";
      })
      .catch((err) => {
        setBtn("Update");
        console.log(err);
      });
  };

  return (
    <section className="max-w-4xl p-10 mx-auto rounded-md shadow-md  mt-5 ">
      <h1 className="text-xl font-bold text-black  capitalize dark:text-black ">
        Complete Profile
      </h1>
      <p className="p-4 text-red-500 text-1xl">{errorMsg}</p>
      <form
        onSubmit={(e) => {
          onHandleSubmit(e);
        }}
      >
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-black  " htmlFor="username">
              Full Name
            </label>
            <input
              value={fullname}
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder=""
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-black  " htmlFor="emailAddress">
              Alternative Phone{" "}
            </label>
            <input
              value={phone}
              id="emailAddress"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-black  " htmlFor="password">
              Bank Account Number
            </label>
            <input
              id="password"
              type="number"
              value={bankaccount}
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => {
                setBankaccount(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-black  " htmlFor="passwordConfirmation">
              BANK NAME
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => {
                setBankname(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-black  " htmlFor="passwordConfirmation">
              IFSC CODE
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => {
                setIfsc(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-black  " htmlFor="passwordConfirmation">
              Aadhaar Number
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 border border-gray-300 rounded-md   dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              onChange={(e) => {
                setAadhaar(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-6">
        
          <button
            style={{
              textAlign: "center",
              backgroundColor: "#1B98F5",
              width: "100%",
              padding: 10,
              color: "white",
              borderRadius: 10,
            }}
           
          >
            {btn}
          </button>
        </div>
      </form>
    </section>
  );
}
