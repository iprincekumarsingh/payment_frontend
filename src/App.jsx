import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "./api/axios";

function App() {
  const [count, setCount] = useState(0);

  const [phone, setPhone] = useState("");
  const [phone_number, setPhone_number] = useState("");

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

    axios.post("/auth/login", { phone_number: phone_number }).then((res) => {
      console.log(res.data);
      if (res.data.success === true) {
        toast.success("OTP sent successfully");
        const randomq = Math.floor(100000 + Math.random() * 900000);
        window.location.href =
          "/auth/login/verify?phone=" + phone_number + "&rand=" + randomq;

        // how to mount the otp component
      } else {
        toast.error("OTP sent failed");
      }
    });
  };

  return (
    <>
      {/* component */}
      <Toaster />
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden  py-12">
        <div className="relative  px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Phone Login</p>
              </div>
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
                        Verify Account
                      </button>
                    </div>
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
