import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import Color from "@styles/Color";
import { useDispatch } from "react-redux";

const modalRootEl = document.getElementById("modal");
if (modalRootEl) {
  modalRootEl.style.display = "none";
  modalRootEl.style.justifyContent = "center";
  modalRootEl.style.alignItems = "center";
  modalRootEl.style.position = "absolute";
  modalRootEl.style.top = "0";
  modalRootEl.style.left = "0";
  modalRootEl.style.width = "100%";
  modalRootEl.style.height = "100%";
  modalRootEl.style.backgroundColor = Color.modal_background;
}

interface ModalProps {
  children: ReactNode;
  open?: Boolean;
}

const Modal = ({ children, open = true }: ModalProps) => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  useEffect(() => {
    modalRootEl?.addEventListener("click", closeModal);
    return () => {
      modalRootEl?.removeEventListener("click", closeModal);
    };
  });

  if (!modalRootEl) return null;
  if (!open) {
    modalRootEl.style.display = "none";
    return null;
  }
  modalRootEl.style.display = "flex";

  return ReactDOM.createPortal(children, modalRootEl);
};

export default Modal;
