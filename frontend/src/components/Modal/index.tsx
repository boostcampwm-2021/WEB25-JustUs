import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

const modalRootEl = document.getElementById("modal");
if (modalRootEl) {
  modalRootEl.style.display = "flex";
  modalRootEl.style.justifyContent = "center";
  modalRootEl.style.alignItems = "center";
  modalRootEl.style.position = "absolute";
  modalRootEl.style.top = "0";
  modalRootEl.style.left = "0";
  modalRootEl.style.width = "100%";
  modalRootEl.style.height = "100%";
  modalRootEl.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
}

interface ModalProps {
  children: ReactNode;
  open: Boolean;
  closeFn: Function;
}

const Modal = ({ children, open = false, closeFn }: ModalProps) => {
  const closeModal = (ev: MouseEvent) => {
    closeFn(ev);
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
