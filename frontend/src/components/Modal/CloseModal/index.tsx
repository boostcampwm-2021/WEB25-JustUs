import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../";

const CloseModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  return (
    <Modal open={false}>
      <div></div>
    </Modal>
  );
};

export default CloseModal;
