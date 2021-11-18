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
import { getGroupListAction } from "@src/reducer/GroupReducer";

const Main = () => {
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { groups }: any = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const { target, clientX, clientY } = event;
      if (!(event.target instanceof HTMLElement)) return;

      dispatch({ type: GroupModalAction.SET_CLICKED_TARGET, payload: { target, clientX, clientY } });
    });

    dispatch(getGroupListAction());
  }, []);

  return (
    <>
      <Header isToggle={isToggle} setIsToggle={setIsToggle} />
      <Content>
        <Sidebar isToggle={isToggle} setIsToggle={setIsToggle} />
        {!!groups.length && <Map />}
        {!groups.length && (
          <CryingGrapeWrapper>
            <Guide>그룹을 생성/참가 해주세요 ㅠㅠ</Guide>
          </CryingGrapeWrapper>
        )}
      </Content>
      <ModalManager setIsToggle={setIsToggle} />
    </>
  );
};

const Content = styled.div`
  display: flex;
`;

const CryingGrapeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: center;
  background-image: url("/icons/crying-podo.png");
  background-size: 40%;
  background-repeat: no-repeat;
  width: 100%;
  height: 95vh;
`;

const Guide = styled.div`
  font-size: 50px;
  margin-bottom: 3vh;
`;

export default Main;
