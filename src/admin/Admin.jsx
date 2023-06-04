import React, { useEffect, useState } from "react";
import user from "../img/icons/user.png";
import money from "../img/icons/money.png";
import notification from "../img/icons/notification.png";
import transcationspng from "../img/icons/transcations.png";
import rmoney from "../img/icons/rmoney.png";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Cookie from "js-cookie";
import Topbar from "../components/Topbar";

import toast, { Toaster } from "react-hot-toast";
export default function Admin() {
  const approveBtn = (msg) => {
    alert(msg);
  };
  const rejectBtn = (msg) => {
    alert(msg);
  };

  const [notificationList, setNotificationList] = useState([]);

  const fetchAPI = async () => {};
  // updating the data
  const handleApprove = (id, status) => {
    axios
      .put(
        "money/" + id,
        { status: status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res:" + res);
        toast.success(res.data.message);
        getData();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };
  // getting all notifications money request
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const filteredResults = notificationList.filter((item) =>
  //   item.phone.includes(searchTerm)
  // );
  const filteredResults = notificationList.filter((item) =>
    item.user.phone.includes(searchTerm)
  );

  const renderResults = searchTerm !== "" ? filteredResults : notificationList;
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    await axios
      .get("money", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.requests);

        setNotificationList(res.data.requests);
        // console.log(notificationList);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  // Separate approved and rejected items
  const approvedItems = renderResults.filter(
    (item) => item.status === "approved"
  );
  const rejectedItems = renderResults.filter(
    (item) => item.status === "rejected"
  );

  // Concatenate the arrays, placing approved and rejected items at the end
  const sortedResults = [
    ...renderResults.filter(
      (item) => item.status !== "approved" && item.status !== "rejected"
    ),
    ...approvedItems,
    ...rejectedItems,
  ];

  const notificationListMap = sortedResults.map((item, index) => {
    return (
      <div className="border w-[90%] mx-auto rounded-md bg-white p-3 mb-5">
        <Toaster></Toaster>
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-bold">
            {item?.user?.first_name + " " + item?.user?.last_name}
          </p>
          <p className="text-base font-bold">{item?.user?.phone}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-bold">{item?.user?.phone}</p>
          <p className="text-base font-bold">₹{item?.amount}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-base font-bold">
            {item?.createdAt?.split("T")?.[0]}
          </p>
          <p className="text-base font-bold">
            {item.status === "approved" ? "✅ " : "🕑 "} {item?.status}
          </p>
        </div>
        {item.status === "approved" ? (
          <p className="text-base text-center pt-2 text-green-500">
            Accepted Already!
          </p>
        ) : (
          <div className="w-full flex justify-between items-center pt-5">
            <button
              onClick={() => {
                handleApprove(item._id, "rejected");
              }}
              className="text-base font-[600] bg-red-500 text-white px-4 py-1 rounded-md"
            >
              Reject
            </button>
            <button
              onClick={() => {
                handleApprove(item._id, "approved");
              }}
              className="text-base bg-green-500 font-[600] text-white px-4 py-1 rounded-md"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="overflow-hidden">
      <Topbar title="Admin Panel" hideicon={"hidden"}></Topbar>

      <div class="flex flex-col w-full p-4 m-1">
        <div className="flex  md:flex-row justify-center items-center gap-4 p-4">
          <div className="flex-1 bg-white border rounded-md shadow-xl">
            <Link
              to="../admin/users"
              className="flex flex-col items-center justify-center  p-4   cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 h-full"
            >
              <img className="mb-2  w-12 h-12" src={user} alt="" />
              <p className="text-sm md:text-base text-whe flex items-center justify-center h-full">
                Users
              </p>
            </Link>
          </div>
          <div className="flex-1 bg-white border rounded-md shadow-xl">
            <Link
              to="../admin/notification"
              className="flex flex-col items-center justify-center  p-4   cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 h-full"
            >
              <img className="mb-2  w-12 h-12" src={notification} alt="" />
              <p className="text-sm md:text-base text-whe flex items-center justify-center h-full">
                Notifications
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-2 text-start flex  text-1xl  justify-around items-center mt-3">
        <div className="text-2xl">Latest Money Request</div>
      </div>

      <div className="w-full overflow-x-hidden h-[55vh] overflow-y-auto mb-14">
        {loading ? (
          <p className="text-center pt-10">Loading...</p>
        ) : (
          notificationListMap
        )}
      </div>
    </div>
  );
}
