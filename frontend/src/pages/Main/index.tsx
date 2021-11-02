import { useState, useEffect } from "react";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";

const Main = () => {
  const [modalOpen, setModal] = useState("");
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const [clickedTarget, setClickedTarget] = useState<{ element: HTMLElement }>({ element: document.body });

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

  const closeModal = () => {
    setModal("");
  };

  useEffect(() => {
    document.addEventListener("click", ({ target }) => {
      if (!(target instanceof HTMLElement)) return;

      setClickedTarget({ element: target });
    });
  }, []);

  return (
    <>
      <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} clickedTarget={clickedTarget} />
      <button onClick={openModal} data-modal="PostCreateModal">
        +
      </button>
      <ModalManager closeFn={closeModal} modal={modalOpen} />
    </>
  );
};

export default Main;
