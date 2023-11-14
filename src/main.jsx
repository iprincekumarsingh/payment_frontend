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
import Card from "./pages/Card.jsx";

const router = createBrowserRouter([
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
        path: "user",
        element: <Home></Home>,
      },
      {
        path: "home/card",
        element: <Card></Card>,
      },
      {
        path: "home/transactions",
        element: <Transcations></Transcations>,
      },

      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "notification",
        element: <RMoney></RMoney>,
      },
      {
        path: "users",
        element: <Alluser></Alluser>,
      },
      {
        path: "newUser",
        element: <NewUser></NewUser>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
    ],
  },

  {
    path: "/auth/login",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
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

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <h1>Internal Server Error</h1>,
//   }
// ]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <RouterProvider router={router} />
  // </React.StrictMode>/
);
