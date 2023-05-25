import React from "react";
import toast, { Toaster } from "react-hot-toast";
// import copy_png from "../img/copy.png";
import { MdContentCopy } from "react-icons/md";

export default function Widget_card({ card_text }) {
  const handleCopy = () => {
    const cardText = document.getElementById("cardText");

    if (cardText) {
      const textToCopy = cardText.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("Text copied successfully:", textToCopy);
          toast.success("Copied to clipboard");

          // You can show a success message or perform any additional actions here
        })
        .catch((error) => {
          console.error("Error copying text:", error);
          // You can show an error message or handle the error in an appropriate way
        });
    }
  };

  return (
    <div className="mt-5 mx-auto shadow-md border flex items-center justify-center space-x-2 e font-semibold px-3 py-3 text-base whitespace-nowrap rounded-xl bg-white">
      <Toaster />
      <div className="truncate font-[600] text-sm space-x-2" id="cardText">
        {card_text.toString()?.split(": ")?.[0]}: XXXXXXXX{""}
        {card_text.toString()?.split(": ")?.[1]?.slice(8)}
      </div>
      <div
        className="flex items-center justify-center space-x-1 cursor-pointer"
        onClick={handleCopy}
      >
        <MdContentCopy className="text-lg" />
      </div>
    </div>
  );
}
