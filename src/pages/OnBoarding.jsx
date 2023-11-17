import React, { useEffect } from "react";
import axios from "../api/axios";
import Cookie from "js-cookie";
export default function OnBoarding() {
  const [phone, setPhone] = React.useState("");
  const [bankaccount, setBankaccount] = React.useState("");
  const [bankname, setBankname] = React.useState("");
  const [ifsc, setIfsc] = React.useState("");
  const [aadhaar, setAadhaar] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");
  const [btn, setBtn] = React.useState("Update");
  const [fathername, setFathername] = React.useState("");
  const [nominee, setNominee] = React.useState("");
  const [panno, setPanno] = React.useState("");
  const [file, setFile] = React.useState("");
  const [first_name, setFirst_name] = React.useState("");
  const [last_name, setLast_name] = React.useState("");
  const [middle_name, setMiddle_name] = React.useState("");

  useEffect(() => {
    document.title = "Onboarding";
    if (!Cookie.get("token")) {
      window.location.href = "/auth/login";
    }

    // get key PROFILE_DATA from localstorage and check that fullname and wallet_no is present or not
    if (!localStorage.getItem("PROFILE_DATA")) {
      const data = JSON.parse(localStorage.getItem("PROFILE_DATA"));
    }
  }, []);

  const onHandleSubmit = (e) => {
    e.preventDefault();

    setBtn("Updating...");
    setErrorMsg("");
    const data = {
      phone,
      bankaccount,
      bankname,
      ifsc,
      aadhaar,
      title,
    };

    // check aaadhhar number is valid or not
    if (aadhaar.length !== 12) {
      setErrorMsg("Aadhaar number must be 12 digits");
      setBtn("Update");
      return;
    }

    // check bank account number is valid or not

    const adharregex = /^[0-9]+$/;
    if (!adharregex.test(aadhaar)) {
      setErrorMsg("Aadhaar number must be number");
      setBtn("Update");
      return;
    }
    // check all the bank account no is number and it must be 12 to 16 digits not less than 12 and not greater than 16
    if (bankaccount.length < 12 || bankaccount.length > 16) {
      setErrorMsg("Bank account number must be 12 to 16 digits");
      setBtn("Update");
      return;
    }
    // regex code to check that bank account no is number or not
    const regex = /^[0-9]+$/;
    if (!regex.test(bankaccount)) {
      setErrorMsg("Bank account number must be number");
      setBtn("Update");
      return;
    }

    // check all fields are filled or not

    if (
      phone === "" ||
      bankaccount === "" ||
      bankname === "" ||
      ifsc === "" ||
      aadhaar === "" ||
      title === ""
    ) {
      setErrorMsg("All fields are required");

      setBtn("Update");
      return;
    }
    const formData = new window.FormData();
    formData.append("file", file);

    const userData = {
      // Other user data properties
      alt_phone: phone,
      account_number: bankaccount,
      bank_name: bankname,
      ifsc_code: ifsc,
      aadhaar_number: aadhaar,
      title: title,
      dob: dob,
      citizenship: citizenship,
      country: country,
      address: address,
      city: city,
      pincode: zip,
      country_of_birth: countrofbirth,
      email: email,
      father_name: fathername,
      nominee_name: nominee,
      pan_no: panno,
      file: formData,
      first_name: first_name,
      last_name: last_name,
      middle_name: middle_name,
    };

    // Add user data to form data

    for (const key in userData) {
      console.log(key, userData[key]);
      formData.append(key, userData[key]);
    }

    console.log(formData);

    axios
      .post("auth/onboarding/new_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + Cookie.get("token"),
        },
      })
      .then((res) => {
        setBtn("Update");
        setErrorMsg("");
        console.log(res.data.message);
        console.log(res.data.user);
        // Cookie.set("token", res.data.token);
        if (localStorage.getItem("PROFILE_DATA") == null) {
          localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.user));
        }

        localStorage.setItem("PROFILE_DATA", JSON.stringify(res.data.user));
        window.location.href = "/home/home/user";
      })
      .catch((err) => {
        setBtn("Update");
        console.log(err);
      });
  };

  const [title, setTitle] = React.useState("");
  const [dob, setDob] = React.useState("");
  const [citizenship, setCitizenship] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [city, setCity] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [countrofbirth, setCountrofbirth] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <section className="max-w-4xl p-10 mx-auto rounded-md shadow-md  mt-5 ">
      <h1 className="text-xl font-bold text-white  capitalize dark:text-white ">
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
            <label className="text-white  " htmlFor="username">
              Title
            </label>
            <select
              name=""
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              id=""
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
            </select>
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              First Name
            </label>
            <input
              onChange={(e) => {
                setFirst_name(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"

            />
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              Middle Name
            </label>
            <input
              onChange={(e) => {
                setMiddle_name(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              Last Name
            </label>
            <input
              onChange={(e) => {
                setLast_name(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              Date of Birth{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              onChange={(e) => {
                setDob(e.target.value);
                console.log(e.target.value);
              }}
              type="date"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              CitizenShip{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              type="text"
              onChange={(e) => setCitizenship(e.target.value)}
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="username">
              Country of birth{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>

            <select
              name=""
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              id=""
              onChange={(e) => {
                setCountrofbirth(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="">Select </option>
              <option value="India">India</option>
              <option value="USA">USA</option>
            </select>
          </div>
          <h1 className="text-xl font-bold text-white  capitalize dark:text-white ">
            Account Holder: Contact Details
          </h1>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Alternative Phone{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              value={phone}
              id="emailAddress"
              type="phone"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              Father Name{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setFathername(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              Nominee Name{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setNominee(e.target.value);
                <span
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                  *
                </span>;
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Residence address: Street / Nr.{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              value={address}
              id="emailAddress"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setAddress(e.target.value);
                console.log(address);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Residence address: Postal Code{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              value={zip}
              id="emailAddress"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setZip(e.target.value);
                console.log(zip);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Residence address: City{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              value={city}
              id="emailAddress"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Country{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <select
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              name=""
              id=""
              onChange={(e) => {
                setCountry(e.target.value);
                console.log(e.target.value);
              }}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              {/* all Country name */}
            </select>
          </div>
          <div>
            <label className="text-white  " htmlFor="emailAddress">
              Email{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              type="email"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="password">
              Bank Account Number{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="text"
              type="text"
              value={bankaccount}
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setBankaccount(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              BANK NAME{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setBankname(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              IFSC CODE{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setIfsc(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              Aadhaar Number{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setAadhaar(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              Pan No{" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
              onChange={(e) => {
                setPanno(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-white  " htmlFor="passwordConfirmation">
              Aadhar Card/ Driving License/ Voter ID / Passport (Any One){" "}
              <span
                style={{
                  color: "red",
                }}
              >
                {" "}
                *
              </span>
            </label>
            <input
              id="passwordConfirmation"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              accept=".jpg,.png,.jpeg ,.pdf"
              className="w-full  focus:bg-slate-700 text-white px-4 py-4 border bg-gray-800 placeholder:text-white  border-[#f2f2] rounded-md shadow-sm  outline-none"
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
