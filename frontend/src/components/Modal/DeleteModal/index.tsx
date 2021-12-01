import styled, { css } from "styled-components";
import {
  smallModalContainer,
  smallModalHeader,
  smallModalTitle,
  smallModalCloseButton,
  smallModalContent,
  flexRowCenterAlign,
} from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";
import { RootState } from "@src/reducer";
import { useDispatch, useSelector } from "react-redux";
import { GroupAction, ModalAction } from "@src/action";
import { icon } from "@src/constants";

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
        dispatch(GroupAction.deletePostRequestAction(selectedPost.postId));
        break;
      case "album":
        dispatch(GroupAction.deleteAlbumRequestAction(albumId));
        break;
    }
    closeModal();
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
