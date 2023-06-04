import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import axios from "../api/axios.js";
import Cookie from "js-cookie";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function NewUser() {
  const [searchTerm, setSearchTerm] = useState("");

  const [user, setUser] = useState([]);

  const [message, setMessage] = useState("");

  const [addMOney, setAddMoney] = useState("");

  const [money, setMoney] = useState("");

  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("admin/user/newUserget", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      });
      const userData = response.data.users;
      setUser(userData);
      console.log(userData);
      console.log(user);
    } catch (error) {
      console.log(error);
      setUser([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const Addmoneypost = (e) => {
    console.log(e);

    axios
      .put(
        `admin/user/activateNewUser/${e}`,
        {
          is_activated: "1",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
      .then((res) => {
        //   setMessage(res.data.message);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const notificationListMap =
    !user || user.length === 0 ? (
      <div>
        <p className="p-2"> No New Registrations.</p>
      </div>
    ) : (
      user.map((item, index) => {
        return (
          <div
            key={index}
            className="border w-[90%] mx-auto rounded-md bg-white p-3 mb-5"
          >
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-bold">
                {item?.first_name + " " + item?.last_name}
              </p>
              <p className="text-base font-bold">{item?.phone}</p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-base font-bold">{item?.account_number}</p>
              <p className="text-base font-bold">
                {item?.createdAt?.split("T")?.[0]}
              </p>
            </div>
            {item.status === "approved" ? (
              <p className="text-base text-center pt-2 text-green-500">
                Accepted Already!
              </p>
            ) : (
              <div className="w-full flex justify-between items-center pt-5">
                <button
                  onClick={(e) => {
                    Addmoneypost(item._id);
                  }}
                  className="text-base font-[600] bg-yellow-500 text-white px-1 py- rounded-md"
                >
                  Activate User
                </button>

                <Link to={`/admin/user/${item._id}`}>
                  <button className="text-base bg-green-500 font-[600] text-white px-4 py- rounded-md">
                    View
                  </button>
                </Link>
              </div>
            )}
          </div>
        );
      })
    );

  return (
    <div>
      <Toaster />
      <Topbar title="New User" hideicon={"hidden"}></Topbar>

      {/* <div className="flex justify-center">
        <input
          type="text"
          className="p-2 border m-5 w-full border-gray-300 shadow-md focus:border-blue-500 rounded-md"
          placeholder="Search user by phone number"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div> */}

      <div className="w-full overflow-x-hidden overflow-y-auto h-[75vh] mb-14">
        {loading ? (
          <p className="text-center pt-10">Loading...</p>
        ) : (
          notificationListMap
        )}
      </div>
    </div>
  );
}
