import React from "react";
import coin from "../../img/coin.gif";

const CheckBalance = ({ amount }) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border shadow-xl p-5 w-[90%] bg-white rounded-xl">
      <div>
        <img src={coin} alt="" className="mx-auto relative bottom-5" />
        <div className="relative bottom-5">
          <p className="text-center">Available Balance</p>
          <p className="text-3xl text-center">₹{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default CheckBalance;
