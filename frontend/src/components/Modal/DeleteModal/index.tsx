import styled, { keyframes, css } from "styled-components";
import { iconHover, flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";
import { RootState } from "@src/reducer";
import { useDispatch, useSelector } from "react-redux";
import { GroupAction, ModalAction } from "@src/action";
import { icon } from "@src/constants";
import { modalTitleFont } from "@styles/StyledComponents";

interface IProps {
  type: string;
}

const DeleteModal = (props: IProps) => {
  const { type } = props;
  const dispatch = useDispatch();
  const { selectedPost, selectedAlbum } = useSelector((state: RootState) => state.modal);
  const { albumId, albumName } = selectedAlbum;
  const { postTitle } = selectedPost;

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const deleteText = () => {
    switch (type) {
      case "post":
        const deletePostText = `"${postTitle}" 게시글을 정말 삭제하시겠습니까?`;
        return deletePostText;
      case "album":
        const deleteAlbumText = `"${albumName}" 앨범을 정말 삭제하시겠습니까?`;
        return deleteAlbumText;
    }
  };

  const onClickDeleteButton = () => {
    switch (type) {
      case "post":
        return dispatch(GroupAction.deletePostRequestAction(selectedPost.postId));
      case "album":
        return dispatch(GroupAction.deleteAlbumRequestAction(albumId));
    }
  };

  return (
    <>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>삭제 확인</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <DeleteTextWrapper>{deleteText()}</DeleteTextWrapper>
          <ButtonWrapper>
            <CancelButton onClick={closeModal}>취소</CancelButton>
            <DeleteButton onClick={onClickDeleteButton}>삭제</DeleteButton>
          </ButtonWrapper>
        </Content>
      </ModalContainer>
    </>
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
  display: grid;
  min-height: 30rem;
  min-width: 40rem;
  border-radius: 1rem;
  grid-template-rows: 20% 80%;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  box-sizing: border-box;
  padding: 3em;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const Title = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  ${modalTitleFont}
  text-align: center;
  margin: auto;
  align-items: center;
`;
const CloseButton = styled.button`
  background-color: ${COLOR.WHITE};
  border: none;
  & > img {
    ${iconHover}
  }
`;
const Content = styled.div`
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DeleteTextWrapper = styled.div`
  ${flexRowCenterAlign}
  font-size: 2rem;
  margin: auto;
`;
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
const button = css`
  border: none;
  border-radius: 1rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    font-weight: bold;
    opacity: 1;
  }
`;
const CancelButton = styled.button`
  ${button}
  color: ${COLOR.WHITE};
  background-color: ${COLOR.BLUE};
`;
const DeleteButton = styled.button`
  ${button}
  color: ${COLOR.WHITE};
  background-color: ${COLOR.RED};
`;

export default DeleteModal;
