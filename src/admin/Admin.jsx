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
export default function Admin() {
  const approveBtn = (msg) => {
    alert(msg);
  };
  const rejectBtn = (msg) => {
    alert(msg);
  };

  const [notificationList, setNotificationList] = useState([]);

  const fetchAPI = async () => {};
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
    console.log(item);
    return (
      <tr className=" border-b text-black" key={index}>
        <p>
          <p className=" ">{item?.user?.first_name}</p>
          <p className=" text-[10px]">778148241346</p>
          <p className="  text-[10px]">{item.createdAt?.split("T")?.[0]}</p>
        </p>
        <td className="px-6 py-4 text-black">Rs.{item.amount}</td>
        <div>
          {item.status === "approved" ? (
            <p className="text-center text-green-700 flex items-center justify-center p-2">
              Accepted Already
            </p>
          ) : item.status === "rejected" ? (
            <p className="text-center text-red justify-center p-2">Rejected</p>
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
      <Topbar title="SX Bank Admin" hideicon={"hidden"}></Topbar>

      <div class="flex flex-col w-full p-4 m-1 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl"> Admin Panel</h1>
        <div className="flex  md:flex-row justify-center items-center gap-4 p-4">
          <div className="flex-1">
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
          <div className="flex-1">
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

      {/*  */}
      <div className="p-2 text-start flex  text-1xl  justify-around items-center mt-3">
        <div className="text-2xl">Latest Money Request</div>
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
          {/* <tbody>{notificationListMap}</tbody> */}
          {/* {JSON.stringify(notificationList)} */}
          {/* {notificationList.map((item, index) => {
            return (
              <div>{item.amount}</div>
            )
          }
          )} */}
        </table>
      </div>
    </>
  );
}
