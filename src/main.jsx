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
import ForgotPassword from "./auth/ForgotPassword.jsx";

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
        path: "home/user",
        element: <Home></Home>,
      },
      {
        path: "home/transactions",
        element: <Transcations></Transcations>,
      },
      {
        path: "home/profile",
        element: <Profile></Profile>,
      },
      {
        path: "home/admin",
        element: <Admin />,
      },
      {
        path: "admin/notification",
        element: <RMoney></RMoney>,
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

    path: "/auth/forgotpassword",
    element: <ForgotPassword></ForgotPassword>
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
    errorElement: <ErrorPage></ErrorPage>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>/
);
