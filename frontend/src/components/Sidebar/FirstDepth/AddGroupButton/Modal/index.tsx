import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import Modal from "@components/Modal";
import React from "react";
import { ModalAction } from "@src/action";
import { modal } from "@src/constants";

const AddGroupModal = () => {
  const dispatch = useDispatch();
  const onClickCreateGroupBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(ModalAction.openModalAction(modal.CreateGroupModal));
  };

  const onClickJoinGroupBtn = () => {
    dispatch(ModalAction.openModalAction(modal.JoinGroupModal));
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <ModalItem onClick={onClickCreateGroupBtn}>그룹 생성</ModalItem>
        <Divider />
        <ModalItem onClick={onClickJoinGroupBtn}>그룹 참가</ModalItem>
      </ModalContainer>
    </Modal>
  );
};

const modalOpen = keyframes`
  0% {
    height: 10px;
  }
  20% {
    height: 170px;
  }
`;

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  width: 240px;
  height: 170px;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation-name: ${modalOpen};
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const ModalItem = styled.button`
  ${flexRowCenterAlign}
  font-size: 20px;
  height: 50%;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    opacity: 0.5;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLOR.BLACK};
`;

export default AddGroupModal;
