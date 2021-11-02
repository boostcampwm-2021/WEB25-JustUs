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
      <div>모달창</div>
      <button type="button" onClick={closeFn}>
        x
      </button>
    </ModalContainer>
  );
};

export default UploadImageModal;

const ModalContainer = styled.div`
  background-color: #ffffff;
  height: 30vw;
  width: 45vw;
  padding: 2vw;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;
