import React from "react";
import Topbar from "../components/Topbar";

export default function Setting() {
  return (
    <>
      <Topbar title="Settings"></Topbar>
      <div className="bg-gray-100 min-h-screen">
  <div className="container mx-auto px-4 py-6">
    {/* <h1 className="text-3xl font-bold mb-4">Settings</h1> */}
    <div className="bg-white rounded-lg shadow-lg px-4 py-2">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Account Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Username:</p>
            {/* <p className="text-sm text-gray-700">{username}</p> */}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Phone:</p>
            <p className="text-sm text-gray-700">{"8093483115"}</p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Paytm:</p>
            <p className="text-sm text-blue-500"><a href="3" target="_blank" rel="noopener noreferrer">{"8093483115"}</a></p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Credit Card:</p>
            <p className="text-sm text-gray-700">{"8093483115"}</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Settings</h2>
        <ul className="list-inside list-disc">
          <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500">Change Password</a></li>
          <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500">Notifications</a></li>
        </ul>
      </div>
      <hr className="my-4" />
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Help &amp; Support</h2>
        <ul className="list-inside list-disc">
          <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500">FAQ</a></li>
          <li><a href="#" className="text-sm text-gray-700 hover:text-blue-500">Contact Us</a></li>
        </ul>
      </div>
      <hr className="my-4" />
      <div>
        <button className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded focus:outline-none w-full" >Logout</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
