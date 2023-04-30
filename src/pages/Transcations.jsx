import React from "react";

export default function Transcations() {
  return (
    <div>
      <h2 className="text-2xl p-4 font-semibold">Transaction</h2>
      <div
        className="flex justify-around text-center p-3 gap-20 border-dashed "
        style={{
          border: "1px solid",
          color: "black",
          padding: 10,
          margin: 10,
          borderRadius: 4,
        }}
      >
        <div className="text-1xl text-[#1C8D73]">
          Credited
          <div className="text-[10px] mt-1 p-1 text-center">
            Today, 12:31 PM
          </div>
        </div>
        <div style={{ top: 17, position: "relative" }}>₹ 1000</div>
      </div>
      <div
        className="flex justify-around text-center p-3 gap-20 border-dashed "
        style={{
          border: "1px solid",
          color: "black",
          padding: 10,
          margin: 10,
          borderRadius: 4,
        }}
      >
        <div className="text-1xl text-[#BF3325]">
          Debited
          <div className="text-[10px] mt-1 p-1  text-center">
            Today, 12:31 PM
          </div>
        </div>
        <div style={{ top: 17, position: "relative" }}>₹ 3000</div>
      </div>
      <div
        className="flex justify-around text-center p-3 gap-20 border-dashed "
        style={{
          border: "1px solid",
          color: "black",
          padding: 10,
          margin: 10,
          borderRadius: 4,
        }}
      >
        <div className="text-1xl text-[#1C8D73]">
          Credited
          <div className="text-[10px] mt-1 p-1 text-black text-center">
          6 Jan, 12:31 PM
          </div>
        </div>
        <div style={{ top: 17, position: "relative" }}>₹ 500</div>
      </div>

      <div className="overflow-x-auto"></div>
    </div>
  );
}
