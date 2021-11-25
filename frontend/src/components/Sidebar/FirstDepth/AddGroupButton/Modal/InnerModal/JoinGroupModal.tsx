import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { requestJoinGroupAction, getGroupListAction } from "@src/reducer/GroupReducer";

const JoinGroupModal = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickJoinBtn = () => {
    if (!inputRef.current) return;
    const code = inputRef.current.value;

    dispatch(requestJoinGroupAction({ code }));
    // dispatch(getGroupListAction());
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
          <TitleWrapper>
            <div>초대 코드를 입력해 주세요.</div>
          </TitleWrapper>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <InviteCodeInputWrapper ref={inputRef} spellCheck={false} onKeyDown={onKeyDown} />
          <JoinBtnWrapper onClick={onClickJoinBtn}>참여하기</JoinBtnWrapper>
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

const TitleWrapper = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  font-size: 2.5rem;
  ${flexColumnCenterAlign};
`;

const CloseBtn = styled.div`
  width: 100%;
  display: flex;
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

const InviteCodeInputWrapper = styled.input`
  margin-top: 5rem;
  width: 30rem;
  height: 10rem;
  font-size: 3rem;
  border: none;
  background: ${COLOR.GRAY};
  border-radius: 10px;
  text-align: center;

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 3px;
  }
`;

const JoinBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 7vw;
  height: 5vh;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  margin-top: 5rem;
  font-size: 2rem;
  cursor: pointer;
`;

export default JoinGroupModal;
