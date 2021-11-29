import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "../";
import { ModalAction } from "@src/action";

const CloseModal = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };
  return (
    <Modal open={false}>
      <div></div>
    </Modal>
  );
};

export default CloseModal;
