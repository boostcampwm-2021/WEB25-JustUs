import { useRef } from "react";
import styled from "styled-components";
import {
  smallModalContainer,
  smallModalHeader,
  smallModalTitle,
  smallModalCloseButton,
  smallModalContent,
  smallButton,
  smallModalInputWrapper,
} from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { AddressAction, ModalAction } from "@src/action";
import { icon, modal } from "@src/constants";

const UploadAddressModal = () => {
  const dispatch = useDispatch();
  const addressInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const nextModal = () => {
    if (addressInputRef.current === null) return;
    if (addressInputRef.current.value === "") return;
    dispatch(AddressAction.setAddressAction(addressInputRef.current.value));
    dispatch(ModalAction.openModalAction(modal.PostCreateModal));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") nextModal();
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>추가 장소명</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <AddressNameInput ref={addressInputRef} onKeyDown={onKeyDown} />
          <InsertAddressName onClick={nextModal}>입력하기</InsertAddressName>
        </Content>
      </ModalContainer>
    </Modal>
  );
};
const ModalContainer = styled.div`
  ${smallModalContainer}
`;
const Header = styled.div`
  ${smallModalHeader}
`;
const Title = styled.div`
  ${smallModalTitle}
`;
const CloseButton = styled.button`
  ${smallModalCloseButton}
`;
const Content = styled.div`
  ${smallModalContent}
`;
const AddressNameInput = styled.input`
  ${smallModalInputWrapper}
`;
const InsertAddressName = styled.button`
  ${smallButton}
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
`;

export default UploadAddressModal;
