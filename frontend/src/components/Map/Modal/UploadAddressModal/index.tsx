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
          <Title>추가할 장소명을 입력하세요.</Title>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <AddressNameInput ref={addressInputRef} />
          <InsertAddressName onClick={nextModal}>입력하기</InsertAddressName>
        </Content>
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
  min-height: 35rem;
  min-width: 30vw;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 2rem;
`;

const Title = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 2.5rem;
  ${flexRowCenterAlign};
`;

const CloseBtn = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  grid-column-start: 3;
  grid-column-end: 4;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
    height: 3rem;
    width: 3rem;
    border-radius: 50%;
    ${flexRowCenterAlign}
    cursor: pointer;
    &:hover {
      background-color: ${COLOR.GRAY};
    }
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddressNameInput = styled.input`
  width: 30rem;
  height: 10rem;
  font-size: 3rem;
  border: none;
  background: ${COLOR.GRAY};
  border-radius: 10px;
  text-align: center;
  margin-top: 5rem;

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
  }
`;

const InsertAddressName = styled.div`
  ${flexRowCenterAlign}
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  font-size: 2rem;
  margin-top: 5rem;
`;

export default UploadAddressModal;
