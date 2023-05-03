import React, { useEffect, useState } from "react";
import user from "../img/icons/user.png";
import money from "../img/icons/money.png";
import notification from "../img/icons/notification.png";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Cookie from "js-cookie";
export default function Admin() {
  const approveBtn = (msg) => {
    alert(msg);
  };
  const rejectBtn = (msg) => {
    alert(msg);
  };

  const [notificationList, setNotificationList] = useState([]);

  const fetchAPI = async () => {

  }

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
      <div className="flex w-full justify-start first-letter: m-0 p-4 bg-slate-500 gap-12">
        <div className="text-2xl md-w-[60%  ] w-[60%]">Admin Panel</div>
      </div>

      <div className="flex shadow-lg  mt-4  flex-wrap justify-around items-center text-center   ">
        <div className="mb-4 ">
          <img src={user} alt="" srcset="" />
          <h1 className="text-[13px] mt-4 font-bold text-center">Users</h1>
        </div>
        <div className="mb-4 ">
          <img src={user} alt="" srcset="" />
          <h1 className="text-[13px] mt-4 font-bold text-center">Users</h1>
        </div>
        <div className="mb-4">
          <img src={user} alt="" srcset="" />
          <h1 className="text-[13px] mt-4 font-bold text-center">Users</h1>
        </div>
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