import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";

const UploadAddressModal = () => {
  const dispatch = useDispatch();
  const addressInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const nextModal = () => {
    if (addressInputRef.current === null) return;
    if (addressInputRef.current.value === "") return;
    dispatch({ type: "SET_ADDRESS", payload: addressInputRef.current.value });
    dispatch({ type: "OPEN_MODAL", payload: "PostCreateModal" });
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>추가할 장소명을 입력하세요.</Title>
          <Content>
            <AddressNameInput ref={addressInputRef} />
            <InsertAddressName onClick={nextModal}>입력하기</InsertAddressName>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};
const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 20vw;
  min-width: 60vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 40px;
`;

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddressNameInput = styled.input`
  margin-top: 30px;
  min-width: 50vw;
  height: 100px;
  font-size: 15px;
  border: none;
  background: ${COLOR.GRAY};
  border-radius: 10px;
  font-size: 50px;
  text-align: center;

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 15px;
  }
`;

const InsertAddressName = styled.div`
  ${flexRowCenterAlign}
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  margin-top: 50px;
  font-size: 30px;
`;

export default UploadAddressModal;
