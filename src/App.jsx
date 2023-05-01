import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "./api/axios";
import Cookie from "js-cookie";

import logo from "./img/sxbank.jpg";

function App() {
  useEffect(() => {
    document.title = "Phone Login";

    if (Cookie.get("token")) {
      window.location.href = "/home";
    }

  }
  );

  const [count, setCount] = useState(0);

  const [phone, setPhone] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [progress, setProgress] = useState("Login");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!phone) {
      return toast.error("Please enter a phone number");
    }

    if (phone.length < 10 || phone.length > 10) {
      return toast.error("Please enter a valid phone number");
    }
    // regex to check phone number is 10 digit or not
    if (!phone.match(/^[0-9]{10}$/)) {
      return toast.error("Please enter a valid phone number");
    }

    setPhone_number("91" + phone);


    axios.post("/auth/login", { phone_number: phone }).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        setProgress("Loggin in...")
        toast.success("OTP sent successfully");
        const randomq = Math.floor(100000 + Math.random() * 900000);
        window.location.href = "/auth/login/verify?phone=" + phone + "&rand=" + randomq;
        // console.log(res.data);

        // how to mount the otp component
      } else {
        toast.error("OTP sent failed");
        setProgress("Login")

      }
    })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        setProgress("Login")
      }
      );

  };

  return (
    <>
      {/* component */}
      <Toaster />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
        <div className="relative  px-6 pt-10 pb-9  mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16 p-3 rounded-lg" style={
            {
              border:"1px solid rgb(37, 150, 190)"
            }
          }>
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl flex-col justify-center items-center">

                <img width={50} src={logo} alt="" />
              </div>
              <p className="text-3xl">Sign In To Your Account</p>
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-full h-16 ">
                      <label htmlFor="" className="p-2 text-[16px]" >Phone Number </label>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-start px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""
                        placeholder="Phone Number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div>
                      <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                      {progress}
                      </button>
                    </div>
                    <a className="text-[12px] text-center text-blue-600" href="">By Login you accept the TERMS & CONDITIONS </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
