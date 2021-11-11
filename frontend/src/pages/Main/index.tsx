import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Header from "@components/Header";
import Sidebar from "@components/Sidebar";
import ModalManager from "@components/Modal/ModalManager";
import Map from "@components/Map";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("click", ({ target }) => {
      if (!(target instanceof HTMLElement)) return;

      dispatch({ type: "SET_CLICKED_TARGET", payload: target });
    });
  }, []);

  return (
    <>
      <Header isToggle={isToggle} setIsToggle={setIsToggle} />
      <Content>
        <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
        <Map />
      </Content>
      <ModalManager />
    </>
  );
};

const Content = styled.div`
  display: flex;
`;

export default Main;
