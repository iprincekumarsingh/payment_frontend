import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Topbar from "../components/Topbar";

// get parameter from url

export default function User() {
  const [user, setUser] = useState({}); // user is an array of object [{}
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/admin/getuser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Topbar title={"Profile  | " + user.fullname}></Topbar>
      <div className="bg-gray-100">
        <div className="bg-white rounded-md p-3 max-w-md mx-auto mt-1">
          <div className="text-start mt-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.fullname}
            </h1>
            <p className="text-gray-500 text-lg mt-2">{user.phone}</p>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-center">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Edit Profile
              </button>
            </div>

            <div className="mt-4">
              <InfoRow label="Name" value={user.fullname} />
              <InfoRow label="Phone" value={user.phone} />
              <InfoRow label="Alternative Phone" value={user.alt_phone} />
              <InfoRow label="Aadhar Number" value={user.aadhaar_number} />
              <InfoRow label="Bank Name" value={user.bank_name} />
              <InfoRow label="IFSC Code" value={user.ifsc_code} />
              <InfoRow label="Wallet Number" value={user.wallet_no} />
              <InfoRow label="Pan Number" value={user.pan_no} />
              <InfoRow label="Address" value={user.address} />
              <InfoRow label="Wallet" value={user.wallet_no} />
              <InfoRow label="Wallet Limit" value={user.wallet_limit} />
              <InfoRow label="Citizenship" value={user.citizenship} />
              <InfoRow label="Country of Birth" value={user.country_of_birth} />
              <InfoRow label="Pin Code" value={user.pincode} />
              <InfoRow label="DOB" value={user.dob} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between mt-4">
      <span className="text-lg text-gray-600 font-medium">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
