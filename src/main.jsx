import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Home from "./pages/Home.jsx";
import LayoutHome from "./layout/layout";

const router = createBrowserRouter([
  {
    path: "/user",
    element: <LayoutHome></LayoutHome>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "home/user",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
  },

  {
    path: "/login/verify",
    element: <OtpVerification></OtpVerification>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
