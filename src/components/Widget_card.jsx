import React from "react";

export default function Widget_card({ card_text }) {
  return (
    <div class="flex justify-center items-center text-center text-blue-900 font-semibold    border w-auto border-blue rounded-md px-2 py-1 text-1xl whitespace-nowrap">
      {card_text.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      })}
    </div>
  );
}
