import React, { useRef } from "react";
import styled from "styled-components";
import Modal from "../";

const ModalContainer = styled.div`
  background-color: #ffffff;
  height: 300px;
  width: 500px;
`;

const PostCreateModal = ({ closeFn = (event: React.SyntheticEvent<EventTarget>) => null, open = false }) => {
  const ModalContainerRef = useRef(null);
  const stopPropagation = (event: React.SyntheticEvent<EventTarget>) => {
    event.nativeEvent.stopImmediatePropagation();
  };
  return (
    <Modal open={open} closeFn={closeFn}>
      <ModalContainer ref={ModalContainerRef} onClick={stopPropagation}>
        <div>모달창</div>
        <button type="button" onClick={closeFn}>
          Close
        </button>
      </ModalContainer>
    </Modal>
  );
};

export default PostCreateModal;
