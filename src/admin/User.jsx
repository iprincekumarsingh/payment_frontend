import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Link, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import Topbar from "../components/Topbar";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
// get parameter from url

export default function User() {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [wallettLimit, setWalletLimit] = useState("");

  const [increaseWalletLimitModal, setIncreaseWalletLimitModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
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
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "admin/updateWalletLimit",
        {
          id: id,
          limit: wallettLimit,
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
        toast.success(res.data.message);
        setIncreaseWalletLimitModal(false);
      })
      .catch((err) => {
        console.log(err);
        // Handle error case
      });
  };

  const banUser = async () => {
    console.log(Cookie.get("token"));
    axios
      .put(
        `admin/user/decativate/${user._id}`,
        {},

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setIncreaseWalletLimitModal(false);
      })
      .catch((err) => {
        console.log(err);
        // Handle error case
      });
  };

  const unbanUser = async () => {
    console.log(Cookie.get("token"));
    axios
      .put(
        `admin/user/activate/${user._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setIncreaseWalletLimitModal(false);
      })
      .catch((err) => {
        console.log(err);
        // Handle error case
      });
  };
  return (
    <>
      <Toaster />
      <Topbar title={"User Profile  "} hideicon={"hidden"}></Topbar>
      <div className="w-full overflow-hidden">
        {loading ? (
          <p className="text-center pt-10">Loading...</p>
        ) : (
          <div className="bg-white rounded-md py-2 px-5 mx-auto ">
            <div className="bg-white rounded-md p-3 mx-auto  relative">
              <div className="text-start mt-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user?.first_name || user?.middle_name || user?.last_name
                    ? `${user?.first_name} ${user.middle_name} ${user.last_name}`
                    : "Name not set"}
                </h1>

                <p className="text-gray-500 text-lg mt-2">{user.phone}</p>
                <p className="text-gray-500 text-2xl font-semibold mt-2">
                  Wallet Balance -{" "}
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(user.wallet_balance))}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-2">
              <div className="flex-col w-full justify-center">
                <button
                  className="w-full mb-2  bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                  onClick={() => setIncreaseWalletLimitModal(true)}
                >
                  Increase Wallet Limit
                </button>
              </div>
              <div className="flex-col w-full justify-center">
                <Link
                  to={`../admin/user/transcations/${id}`}
                  className="block w-full py-2 px-4 rounded-lg text-center bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Show Transactions
                </Link>
              </div>
              <div className="flex-col w-full justify-center mt-1">
                <Link
                  to={`../edit/user/${id}`}
                  className="block w-full py-2 px-4 rounded-lg text-center bg-blue-500 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit User
                </Link>
              </div>
              <div className="flex-col w-full justify-center mt-1">
                {user?.account_status === "1" ? (
                  <button
                    onClick={banUser}
                    className="block w-full py-2 px-4 rounded-lg text-center bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                  >
                    Ban User
                  </button>
                ) : (
                  <button
                    onClick={unbanUser}
                    className="block w-full py-2 px-4 rounded-lg text-center bg-green-600 hover:bg-green-700 text-white font-semibold shadow-md hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
                  >
                    Unban User
                  </button>
                )}
              </div>

              <div className="pt-2 [&>*:nth-child(2n+1)]:bg-gray-100 [&>*:nth-child(2n)]:bg-gray-300 h-[50vh] overflow-y-auto overflow-x-hidden">
                <InfoRow
                  label="Name"
                  value={
                    user.first_name +
                    " " +
                    user.middle_name +
                    " " +
                    user.last_name
                  }
                />
                <InfoRow label="Phone" value={user.phone} />
                <InfoRow label="Alternative Phone" value={user.alt_phone} />
                <InfoRow label="Aadhar Number" value={user.aadhaar_number} />
                <InfoRow label="Bank Name" value={user.bank_name} />
                <InfoRow label="IFSC Code" value={user.ifsc_code} />
                <InfoRow label="Wallet Number" value={user.wallet_no} />
                <InfoRow label="Pan Number" value={user.pan_no} />
                <InfoRow label="Address" value={user.address} />
                <InfoRow label="Wallet" value={user.wallet_no} />
                <InfoRow
                  label="Wallet Limit"
                  value={Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(Number(user.wallet_limit))}
                />

                <InfoRow label="Citizenship" value={user.citizenship} />
                <InfoRow
                  label="Country of Birth"
                  value={user.country_of_birth}
                />
                <InfoRow label="Pin Code" value={user.pincode} />
                <InfoRow label="DOB" value={user.dob} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={increaseWalletLimitModal}
        // onRequestClose={}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: "50",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1rem",
            border: "1px solid rgba(189, 189, 189, 1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            padding: "2rem",
            minWidth: "20rem",
            maxWidth: "80vw",
          },
        }}
        // className="flex items-center justify-center"
        // overlayClassName="fixed inset-0 bg-black opacity-50 z-50"
      >
        <div className="bg-white rounded-lg w-full sm:w-96">
          <div
            className="flex justify-end"
            onClick={(e) => {
              e.preventDefault();

              setIncreaseWalletLimitModal(false);
            }}
          >
            {" "}
            X
          </div>
          <div className="p-4">
            <h2 className="text-[14px] font-bold mb-4 text-center">
              Update Wallet Limit
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <div className="flex flex-col items-center justify-center mb-6">
                <input
                  type="text"
                  className="h-12 w-full sm:w-72 rounded-lg border-gray-300 border-2 text-center mb-2 focus:outline-none focus:border-blue-500"
                  placeholder="Enter Wallet Limit"
                  // onChange={(e) => setOtp(e.target.value)}
                  onChange={(e) => setWalletLimit(e.target.value)}
                  value={wallettLimit}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Update Wallet Limit
                </button>
              </div>
            </form>
            <p className="text-green-700 mt-3 text-center"></p>
          </div>
        </div>
      </Modal>
    </>
  );
}
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between p-3 border-b">
      <span className="text-base text-gray-600 font-medium">{label}</span>
      <span className="text-base font-semibold">{value}</span>
    </div>
  );
}
