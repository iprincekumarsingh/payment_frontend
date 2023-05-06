import React from "react";
import Modal from "react-modal";

export default function ModalComponents() {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      W
    >
      <section className="rounded-1xl p-4 border-[1px] border-black border-solid">
        <div className="flex-col justify-center items-center ">
          <hr />
          <h1 className="text-3xl font-bold text-center">Send Money</h1>
          <img
            className="justify-center items-center"
            src={qrcode}
            alt=""
            srcset=""
          />
          <p className="p-2 text-start mr-4 ml-4 text-red-500">
            send money on QR and Share the ss on Whatsapp no
          </p>
        </div>
        <hr />
      </section>
    </Modal>
  );
}
