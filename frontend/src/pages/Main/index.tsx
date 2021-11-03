import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";
import { GroupModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const Main = () => {
  const [modalOpen, setModal] = useState("");
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { groups }: any = useSelector((state: RootState) => state.groups);

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
    // document.addEventListener("click", ({ target }) => {
    document.addEventListener("click", event => {
      const { target, clientX, clientY } = event;

      if (!(event.target instanceof HTMLElement)) return;

      // dispatch({ type: GroupModalAction.SET_CLICKED_TARGET, payload: target });
      dispatch({ type: GroupModalAction.SET_CLICKED_TARGET, payload: { target, clientX, clientY } });
    });
  }, []);

  return (
    <>
      <Header isToggle={isToggle} setIsToggle={setIsToggle} />
      <Content>
        <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
        {groups.length && <Map />}
        {!groups.length && <CryingGrapeWrapper />}
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

const CryingGrapeWrapper = styled.div`
  background-color: blue;
  width: 100%;
  height: 95vh;
`;

export default Main;
