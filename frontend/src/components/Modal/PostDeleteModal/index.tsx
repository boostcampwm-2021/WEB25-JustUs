import Modal from "@components/Modal";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useDispatch } from "react-redux";
import { GroupAction, ModalAction } from "@src/action";

const PostDeleteModal = () => {
  const dispatch = useDispatch();
  const { selectedPost }: any = useSelector((state: RootState) => state.modal);
  const { selectedGroup, albumList }: any = useSelector((state: RootState) => state.groups);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onClickDeleteBtn = () => {
    dispatch(GroupAction.deletePostRequestAction(selectedPost.postId));
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>삭제 확인</Title>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <DeleteAlbumGuideWrapper>"{selectedPost.postTitle}" 게시글을 정말 삭제하시겠습니까?</DeleteAlbumGuideWrapper>
          <BtnWrapper>
            <CancelBtnWrapper onClick={closeModal}>취소</CancelBtnWrapper>
            <DeleteBtnWrapper onClick={onClickDeleteBtn}>삭제</DeleteBtnWrapper>
          </BtnWrapper>
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
  min-height: 35vh;
  min-width: 30vw;
  border-radius: 5rem;
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
const CloseBtn = styled.div`
  width: 100%;
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
const Title = styled.div`
  font-size: 2.5rem;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
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
  font-size: 2rem;
  text-align: center;
`;

const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 40% 20% 40%;
`;
const CancelBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 7vw;
  height: 5vh;
  border-radius: 10px;
  border: 1px solid ${COLOR.BLUE};
  color: ${COLOR.BLACK};
  background-color: ${COLOR.WHITE};
  margin-top: 50px;
  font-size: 2rem;
  grid-column-start: 1;
  grid-column-end: 2;
  cursor: pointer;
`;
const DeleteBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 7vw;
  height: 5vh;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.RED};
  margin-top: 50px;
  font-size: 2rem;
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;
export default PostDeleteModal;
