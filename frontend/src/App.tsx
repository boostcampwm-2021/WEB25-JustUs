import React, { useState } from "react";
import ModalManager from "./components/Modal/ModalManager";

function App() {
  const [modalOpen, setModal] = useState("");

  const openModal = (event: React.SyntheticEvent<EventTarget>) => {
    if (!(event.target instanceof HTMLButtonElement)) return;
    event.preventDefault();
    const {
      target: {
        dataset: { modal },
      },
    } = event;
    if (modal) setModal(modal);
  };

  const closeModal = (event: React.SyntheticEvent<EventTarget>) => {
    event.stopPropagation();
    setModal("");
    return null;
  };

  return (
    <>
      <button onClick={openModal} data-modal="PostCreateModal">
        버튼
      </button>
      <div>우리끼리</div>
      <ModalManager closeFn={closeModal} modal={modalOpen} />
    </>
  );
}

export default App;
