import styled from "styled-components";
import Color from "@styles/Color";
import { useDispatch } from "react-redux";

const AddGroupModal = () => {
  const dispatch = useDispatch();

  const onClickCreateGroupBtn = () => {
    dispatch({ type: "OPEN_CREATE_GROUP_MODAL" });
  };

  const onClickJoinGroupBtn = () => {
    dispatch({ type: "OPEN_JOIN_GROUP_MODAL" });
  };

  return (
    <ModalWrapper>
      <ModalItem onClick={onClickCreateGroupBtn}>그룹 생성</ModalItem>
      <Divider />
      <ModalItem onClick={onClickJoinGroupBtn}>그룹 참가</ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 150px;
  height: 100px;
  background-color: ${Color.gray};
  position: absolute;
  top: 70px;
  left: 110px;
  border-radius: 10px;
  z-index: 5;
`;

const ModalItem = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Color.black};
`;

export default AddGroupModal;
