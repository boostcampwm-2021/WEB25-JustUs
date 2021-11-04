import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";

const JoinGroupModal = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return (
    <Modal>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>초대 코드를 입력해 주세요.</Title>
          <Content>
            <InviteCodeInputWrapper />
            <JoinBtnWrapper>참여하기</JoinBtnWrapper>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 20vw;
  min-width: 60vw;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
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

const InviteCodeInputWrapper = styled.input`
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

const JoinBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.THEME1.PRIMARY};
  margin-top: 50px;
  font-size: 30px;
`;

export default JoinGroupModal;
