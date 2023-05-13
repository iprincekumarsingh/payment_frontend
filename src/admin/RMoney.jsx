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
export default function RMoney() {
  const approveBtn = (msg) => {
    alert(msg);
  };
  const rejectBtn = (msg) => {
    alert(msg);
  };

  const [notificationList, setNotificationList] = useState([]);
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

  const fetchAPI = async () => {};

  // getting all notifications money request
  useEffect(() => {
    axios
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
  }, []);
  const formatDate = (date) => {
    const options = { day: "numeric", month: "short", year: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [day, month, year] = formattedDate.split(" ");
    return `${day} ${month} ${year}`;
  };

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
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      <tr className=" border-b " key={index}>
        <td
          className="flex-col px-6 py-4 "
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <th className="flex-col font-medium text-gray-900 whitespace-nowrap ">
            {item.name}
          </th>
          <th className=" font-medium text-gray-900 whitespace-nowrap ">
            {formatDate(item.createdAt)}
          </th>
          <th className=" font-medium text-gray-900 whitespace-nowrap ">
            Phone: {item.user.phone}
          </th>
          <th className=" font-medium text-gray-900 whitespace-nowrap ">
            Status: {item.status}
          </th>
        </td>
        <td className="px-6 py-4 text-black">Rs.{item.amount}</td>
        <div>
          {item.status === "approved" ? (
            <p className="text-center text-green-700 flex items-center">
              Accepted Already
            </p>
          ) : item.status === "rejected" ? (
            <p className="text-center text-red">Rejected</p>
          ) : (
            <>
              <button
                onClick={() => {
                  handleApprove(item._id, "approved");
                }}
                className="bg-emerald-600"
                style={{
                  width: "100px",
                  padding: "10px 20px",
                  margin: "2px",
                  color: "white",
                }}
              >
                APPROVED
              </button>
              <button
                onClick={() => {
                  handleApprove(item._id, "rejected");
                }}
                style={{
                  background: "red",
                  padding: "10px 20px",
                  margin: "2px",
                  width: "100px",
                  color: "white",
                }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </tr>
    );
  });

  return (
    <>
      <Topbar title={"Money Requests"} />

      <div className="flex justify-center">
        <input
          type="text"
          className="p-2 border m-2 w-[300px] border-black focus:border-blue-500 rounded-md"
          placeholder="Search Phone Number"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="w-full overflow-x-auto mb-14">
        <table className="w-full text-sm text-left it text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Tools
              </th>
            </tr>
          </thead>
          {notificationListMap}
        </table>
      </div>
    </>
  );
}
