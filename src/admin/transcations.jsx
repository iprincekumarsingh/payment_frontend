import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";
import Cookie from "js-cookie";
import { FaRupeeSign } from "react-icons/fa";

export default function UserTranscations() {
  const [transcations, setTranscations] = React.useState([]);

  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const getData = async () => {
    setloading(true);
    await axios
      .get("admin/user/transcations", {
        params: {
          id: id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookie.get("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setTranscations(res.data.transferHistory);
      })
      .catch((err) => {
        console.log(err);
      });
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const userTranscations = transcations.map((transcation, index) => {
    return (
      <tr key={index} className="border-b border-gray-200">
        <td className="px-1 py-4 whitespace-nowrap">
          <div className="flex items-start text-start">
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                Date:{" "}
                {new Date(transcation.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div className="text-sm font-medium text-gray-900">
                Name: {transcation.receiver.name}
              </div>
              <div className="text-sm font-medium text-gray-900">
                no: {transcation.receiver.phone}
              </div>
              <div className="text-sm font-medium text-gray-900">
                <p
                  className={`text-sm font-medium ${
                    transcation.status === "transferred"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status:{" "}
                  {transcation.status === "transferred"
                    ? "Successful Transaction"
                    : transcation.status}
                </p>
              </div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-sm font-medium text-gray-900">
            {transcation.status === "transferred" ? "Sent" : "Received"}:{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(transcation.amount)}
          </div>
        </td>
      </tr>
    );
  });
  return (
    <>
      <Topbar title={"User Transcations"} hideicon="hidden" />
      <div>
        <div className="w-full mb-14 h-[85vh] overflow-y-auto overflow-x-hidden">
          {loading ? (
            <p className="text-center pt-10">Loading...</p>
          ) : (
            userTranscations
          )}
        </div>
      </div>
    </>
  );
}
