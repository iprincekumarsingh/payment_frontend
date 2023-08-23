import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Home from "./pages/Home.jsx";
import LayoutHome from "./layout/layout";
import Transcations from "./pages/Transcations.jsx";
import Profile from "./pages/Profile.jsx";
import Admin from "./admin/Admin.jsx";
import RMoney from "./admin/RMoney.jsx";

import TransferMoney from "./pages/TransferMoney.jsx";
import OnBoarding from "./pages/OnBoarding.jsx";
import Register from "./auth/Register.jsx";

import Setting from "./pages/Setting.jsx";
import Fileupload from "./test/fileupload.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import Alluser from "./admin/Alluser.jsx";
import User from "./admin/User.jsx";
import UserTranscations from "./admin/transcations.jsx";
import MoneyRequestTranscations from "./admin/MoneyRequestTranscations.jsx";
import EditUser from "./admin/editUser.jsx";
import NewUser from "./admin/NewUser.jsx";
import { BrowserView } from "react-device-detect";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <div className="flex justify-center items-center h-screen">
  //   <div className="text-center font-medium">
  //    <span className="text-5xl"> ERROR 500</span>,<br></br> <span className="text-4xl font-bold">Update your App to the latest Version</span>
  //   </div>
  // </div>
  // ,
  //   errorElement: <ErrorPage></ErrorPage>,
  // },
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/home",
    element: <LayoutHome></LayoutHome>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "home/user",
        element: <Home></Home>,
      },
      {
        path: "home/transactions",
        element: <Transcations></Transcations>,
      },

      {
        path: "home/admin",
        element: <Admin />,
      },
      {
        path: "admin/notification",
        element: <RMoney></RMoney>,
      },
      {
        path: "admin/users",
        element: <Alluser></Alluser>,
      },
      {
        path: "admin/newUser",
        element: <NewUser></NewUser>,
      },
    ],
  },

  {
    path: "/auth/login",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "home/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/auth/register",
    element: <Register></Register>,
  },

  {
    path: "/transfer/money",
    element: <TransferMoney></TransferMoney>,
  },

  {
    path: "auth/login/verify",
    element: <OtpVerification></OtpVerification>,
  },
  // onboarding the new user
  {
    path: "/auth/onboarding",
    element: <OnBoarding></OnBoarding>,
    // errorElement: <ErrorPage></ErrorPage>,
  },
  {
    path: "/settings",
    element: <Setting></Setting>,
  },

  {
    path: "/file/test",
    element: <Fileupload></Fileupload>,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: "admin/user/:id",
    element: <User></User>,
  },
  {
    path: "admin/user/transcations/:id",
    element: <UserTranscations></UserTranscations>,
  },
  {
    path: "/admin/user/moneyRequest/:id",
    element: <MoneyRequestTranscations></MoneyRequestTranscations>,
  },
  {
    path: "edit/user/:id",
    element: <EditUser></EditUser>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <RouterProvider router={router} />
  // </React.StrictMode>/
);
