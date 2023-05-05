
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

  //  render all the notificationlist with a key
  const notificationListMap = notificationList.map((item, index) => {
    return (
      <tr className=" border-b " key={index}>
        <tr
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
            Date- 24/2/23
          </th>
          <th className=" font-medium text-gray-900 whitespace-nowrap ">
            778148241346
          </th>
        </tr>
        <td className="px-6 py-4 text-black">Rs.{item.amount}</td>
        <div>
          <button
            onClick={() => {
              approveBtn("Approved Successfully");
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
              rejectBtn("Rejected Successfully");
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
        </div>
      </tr>
    );
  });

  return (
    <>
      <Topbar title="SX Bank Admin"></Topbar>

      <div className="flex shadow-lg  mt-4  flex-wrap justify-center items-center text-center "style={{
          
            border: "1px solid",
            margin: "10px",
            borderRadius: "10px",
      }}>
        <div className="mb-4 p-4 text-center flex-col justify-center items-center">
          <img src={user} alt="" srcset="" />
          <h1 className="text-[13px] mt-4 font-bold text-center">Users</h1>
        </div>
        <Link to="../admin/notification">
          <div
            className="mb-4 p-4 text-center  flex-col justify-center items-center"
            style={{
              display: "flex",
            }}
          >
            <img src={rmoney} alt="" srcset="" />
            <h1 className="text-[13px] mt-4 font-bold text-center">
              Request Money
            </h1>
          </div>
        </Link>
        <Link to="../home/transactions">
          <div
            className="mb-4 p-4 text-center flex-col justify-center items-center"
            style={{
              display: "flex",
            }}
          >
            <img src={transcationspng} alt="" srcset="" />
            <h1 className="text-[13px] mt-4 font-bold text-center">
              Transcations
            </h1>
          </div>
        </Link>
      </div>
      {/*  */}
      <div className="p-2 text-start flex  text-1xl  justify-around items-center mt-3">
        <div className="text-2xl">Latest Money Request</div>
        <div className="text-blue-700">View All</div>
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
