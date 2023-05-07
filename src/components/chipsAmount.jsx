import React from "react";

export default function ChipsAmount({ amount_chip, setClick }) {
  return (
    <div
      className="flex  justify-center items-center text-center text-blue-900 font-semibold  border border-[#bac7db] rounded-md px-2 py-1  m-2 whitespace-nowrap"
      onClick={setClick}
    >
      ₹{amount_chip}
    </div>
  );
}
