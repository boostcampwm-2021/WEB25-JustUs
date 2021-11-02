import styled from "styled-components";

interface UploadImageModalProps {
  closeFn: () => void;
}

const UploadImageModal = ({ closeFn }: UploadImageModalProps) => {
  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        <ModalClose type="button" onClick={closeFn}>
          <img src="/icons/x.svg" alt="close" height="60%"></img>
        </ModalClose>
      </ModalHeader>
    </ModalContainer>
  );
};

export default UploadImageModal;

const ModalContainer = styled.div`
  background-color: #ffffff;
  height: 30vw;
  width: 45vw;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 2.5vw;
  border-bottom: 1px solid black;
  font-size: 1.2vw;
`;

const ModalTitle = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ModalClose = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  right: 0px;
  top: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;
