import ReactDOM from "react-dom";
import { ReactNode } from "react";

const toastEl = document.getElementById("toast-message");
if (toastEl) {
  toastEl.style.display = "flex";
  toastEl.style.justifyContent = "center";
  toastEl.style.alignItems = " flex-end";
  toastEl.style.width = "100%";
  toastEl.style.height = "100%";
  toastEl.style.position = "absolute";
  toastEl.style.top = "0";
  toastEl.style.left = "0";
  toastEl.style.overflow = "hidden";
}

interface ToastProps {
  children: ReactNode;
}

const Toast = ({ children }: ToastProps) => {
  if (!toastEl) return null;

  return ReactDOM.createPortal(children, toastEl);
};

export default Toast;
