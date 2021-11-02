import React from "react";
import styled from "styled-components";
import Modal from "../";

interface PostCreateModalProps {
  closeFn: () => void;
  open: boolean;
}

const PostCreateModal = ({ closeFn, open = false }: PostCreateModalProps) => {
  return (
    <Modal open={open} closeFn={closeFn}>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <div>모달창</div>
        <button type="button" onClick={closeFn}>
          x
        </button>
      </ModalContainer>
    </Modal>
  );
};

export default PostCreateModal;

const ModalContainer = styled.div`
  background-color: #ffffff;
  height: 30vw;
  width: 50vw;
`;
