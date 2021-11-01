import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

const modalRootEl = document.getElementById("modal");

interface ModalProps {
  children: ReactNode;
  open: Boolean;
  closeFn: Function;
}

const Modal = ({ children, open = false, closeFn }: ModalProps) => {

  if (!modalRootEl) return null;
  if (!open) {
    return null;
  }

  return ReactDOM.createPortal(children, modalRootEl);
};

export default Modal;
