import React, { useState } from "react";

export default function RMoney() {


  const [hem, setHem] = useState()


  return (
    <>
      <button onClick={() => {
        setHem("helloo")
        // console.log(hem);
      }}>Button</button>


      <div>{hem}</div>
    </>
  )
}
