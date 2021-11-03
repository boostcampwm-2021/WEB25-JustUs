import { useState } from "react";
import styled from "styled-components";

import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";

const Main = () => {
  const [modalOpen, setModal] = useState("");
  const [isToggle, setIsToggle] = useState<boolean>(true);

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

  return (
    <>
      <Header isToggle={isToggle} setIsToggle={setIsToggle} />
      <Content>
        <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
        <Map />
      </Content>
      <button onClick={openModal} data-modal="PostCreateModal">
        +
      </button>
      <ModalManager closeFn={closeModal} modal={modalOpen} />
    </>
  );
};

const Content = styled.div`
  display: flex;
`;

export default Main;
