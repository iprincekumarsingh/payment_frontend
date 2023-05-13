import React from "react";
import toast, { Toaster } from "react-hot-toast";
import copy_png from "../img/copy.png";
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
    <div class="mt-5 flex items-center justify-center space-x-2 e font-semibold rounded-md px-3 py-1 text-base whitespace-nowrap">
      <Toaster />
      <div class="truncate" id="cardText">
        {card_text.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        })}
      </div>
      <div
        class="flex items-center justify-center space-x-1 cursor-pointer"
        onClick={handleCopy}
      >
        <img src={copy_png} alt="" width={20} />
      </div>
    </div>
  );
}
