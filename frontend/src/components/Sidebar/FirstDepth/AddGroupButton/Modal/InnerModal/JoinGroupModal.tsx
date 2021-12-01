import { useEffect, useRef } from "react";
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
import { GroupAction, ModalAction } from "@src/action";
import { icon } from "@src/constants";

const JoinGroupModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onClickJoinBtn = () => {
    if (!inputRef.current) return;
    const code = inputRef.current.value;

    dispatch(GroupAction.requestJoinGroupAction({ code }));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") onClickJoinBtn();
  };

  useEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);
  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>초대 코드 입력</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <InviteCodeInputWrapper ref={inputRef} spellCheck={false} onKeyDown={onKeyDown} />
          <JoinBtnWrapper onClick={onClickJoinBtn}>참여하기</JoinBtnWrapper>
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
  margin-top: 2rem;
  ${smallModalContent}
`;

const InviteCodeInputWrapper = styled.input`
  ${smallModalInputWrapper}
`;

const JoinBtnWrapper = styled.div`
  ${smallButton}
  background-color: ${(props) => props.theme.PRIMARY};
  margin: auto;
  color: ${COLOR.WHITE};
`;

export default JoinGroupModal;
