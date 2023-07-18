import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { Link, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "../api/axios";
export default function EditUser() {
  const { id } = useParams();
  const [user, setUser] = React.useState([]);
  //   generate all usestate for user data
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLastName] = useState("");
  const [middle_name, setMiddleName] = useState("");
  const [alternative_phone, setAlternativePhone] = useState("");
  const [bank_account, setBankAccount] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bank_name, setBankName] = useState("");
  const [bank_ifsc, setBankIfsc] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [walletLimit, setWalletLimit] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  // gettin user data
  const getData = async () => {
    await axios
      .get("/admin/getuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data.user);

        setUser(res.data.user);
        setFirst_name(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setMiddleName(res.data.user.middle_name);
        setBankAccount(res.data.user.account_number);
        setBankName(res.data.user.bank_name);
        setBankIfsc(res.data.user.ifsc_code);
        setAlternativePhone(res.data.user.alt_phone);
        setAddress(res.data.user.address);
        setCity(res.data.user.city);
        setCountry(res.data.user.country);
        setDob(res.data.user.dob);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setWalletLimit(res.data.user.wallet_limit);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        "/admin/user/update",
        {
          id: id,
          first_name: first_name,
          last_name: last_name,
          middle_name: middle_name,
          account_number: bank_account,
          bank_name: bank_name,
          ifsc_code: bank_ifsc,
          alt_phone: alternative_phone,
          address: address,
          city: city,
          country: country,
          dob: dob,
          email: email,
          phone: phone,
          wallet_limit: walletLimit,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <Topbar title={"Edit User "} hideicon={"hidden"}></Topbar>

      {/* get all details of user in form  */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="grid grid-cols-1 gap-y-6"
          >
            <EditForm
              htmlfor={"first_name"}
              labelName={"First Name"}
              inputType={"text"}
              InputValue={first_name}
              onchageFunction={(e) => {
                setFirst_name(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"middle_name"}
              labelName={"Middle Name"}
              inputType={"text"}
              InputValue={middle_name}
              onchageFunction={(e) => {
                setMiddleName(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"last_name"}
              labelName={"Last Name"}
              inputType={"text"}
              InputValue={last_name}
              onchageFunction={(e) => {
                setLastName(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"email"}
              labelName={"Email"}
              inputType={"text"}
              InputValue={email}
              onchageFunction={(e) => {
                setEmail(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"phone"}
              labelName={"Phone"}
              inputType={"text"}
              InputValue={phone}
              onchageFunction={(e) => {
                setPhone(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"Alternative Phone"}
              labelName={"Alternative Phone"}
              inputType={"number"}
              InputValue={alternative_phone}
              onchageFunction={(e) => {
                setAlternativePhone(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"City"}
              labelName={"City"}
              inputType={"text"}
              InputValue={city}
              onchageFunction={(e) => {
                setCity(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"Address"}
              labelName={"Address"}
              inputType={"text"}
              InputValue={address}
              onchageFunction={(e) => {
                setAddress(e.target.value);
              }}
            ></EditForm>

            <EditForm
              htmlfor={"dob"}
              labelName={"Date of Birth"}
              inputType={"date"}
              InputValue={dob}
              onchageFunction={(e) => {
                setDob(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"walletLimit"}
              labelName={"Wallet Limit"}
              inputType={"text"}
              InputValue={walletLimit}
              onchageFunction={(e) => {
                setWalletLimit(e.target.value);
              }}
            ></EditForm>

            <EditForm
              htmlfor={"BANK_NAME"}
              labelName={"Bank Name"}
              inputType={"text"}
              InputValue={bank_name}
              onchageFunction={(e) => {
                setBankName(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"BANK_ACCOUNT"}
              labelName={"Bank Account"}
              inputType={"text"}
              InputValue={bank_account}
              onchageFunction={(e) => {
                setBankAccount(e.target.value);
              }}
            ></EditForm>
            <EditForm
              htmlfor={"BANK_IFSC"}
              labelName={"Bank IFSC"}
              inputType={"text"}
              InputValue={bank_ifsc}
              onchageFunction={(e) => {
                setBankIfsc(e.target.value);
              }}
            ></EditForm>

            <button
              type="submit"
              className="bg-blue-500 w-full mt-2  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update User
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

const EditForm = ({
  htmlfor,
  labelName,
  inputType,
  InputValue,
  onchageFunction,
}) => {
  return (
    <div>
      <label
        htmlFor={htmlfor}
        className="block text-sm font-medium text-gray-700"
      >
        {labelName}
      </label>
      <div className="mt-1">
        <input
          type={inputType}
          name="middle_name"
          id="middle_name"
          autoComplete="given-name"
          className="py-3 px-4 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          value={InputValue}
          onChange={onchageFunction}
        />
      </div>
    </div>
  );
};
