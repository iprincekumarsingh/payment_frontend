import React from "react";

export default function Widget_card({ card_text }) {
    return (
        <div class="flex justify-center items-center text-center text-blue-900 font-semibold bg-blue-100 border border-blue-900 rounded-md px-2 py-1 text-xs whitespace-nowrap">
            {card_text}
        </div>

    );
}
