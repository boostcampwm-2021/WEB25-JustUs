import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction, ModalAction } from "@src/action";
import { icon } from "@src/constants";

const DeleteAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.modal);
  const { selectedGroup, albumList }: any = useSelector((state: RootState) => state.groups);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onClickCancelBtn = () => {
    closeModal();
  };

  const onClickDeleteBtn = () => {
    const albumId = selectedAlbum.albumId;
    dispatch(GroupAction.deleteAlbumRequestAction(albumId));
    closeModal();
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
              <img src={icon.clear} alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>삭제 확인</Title>
          <Content>
            <DeleteAlbumGuideWrapper>"{selectedAlbum.albumName}" 앨범을 정말 삭제하시겠습니까?</DeleteAlbumGuideWrapper>
            <BtnWrapper>
              <CancelBtnWrapper onClick={onClickCancelBtn}>취소</CancelBtnWrapper>
              <DeleteBtnWrapper onClick={onClickDeleteBtn}>삭제</DeleteBtnWrapper>
            </BtnWrapper>
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
  min-height: 35vh;
  min-width: 30vw;
  border-radius: 2rem;
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
  font-size: 3.5rem;
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
  margin-top: 2rem;
`;

const DeleteAlbumGuideWrapper = styled.div`
  width: 100%;
  margin-top: 30px;
  font-size: 1.5rem;
  text-align: center;
`;

const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;

const CancelBtnWrapper = styled.div`
  // ${flexRowCenterAlign}
  width: 8rem;
  height: 39px;
  border-radius: 10px;
  border: 1px solid ${COLOR.BLUE};
  color: ${COLOR.BLACK};
  background-color: ${COLOR.WHITE};
  margin-top: 50px;
  font-size: 30px;
  grid-column-start: 1;
  grid-column-end: 2;
  cursor: pointer;
`;

const DeleteBtnWrapper = styled.div`
  // ${flexRowCenterAlign}
  width: 8rem;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.RED};
  margin-top: 50px;
  font-size: 30px;
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;

export default DeleteAlbumModal;
