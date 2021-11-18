import { useState, ChangeEvent } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction } from "@src/action";
import { updateAlbumRequestAction } from "@src/reducer/AlbumReducer";

const UpdateAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.modal);
  const [updateAlbumName, setUpdateAlbumName] = useState(true);
  const { groups, selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const originAlbumName = selectedAlbum.albumName;
  const [newAlbumName, setNewAlbumName] = useState(originAlbumName);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAlbumName(e.target.value);
    setUpdateAlbumName(false);
  };

  const onClickSave = () => {
    if (newAlbumName === originAlbumName) {
      closeModal();
      return;
    }
    const albumId = selectedAlbum.albumID;
    dispatch(updateAlbumRequestAction(newAlbumName, albumId));
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
          <Title>앨범 이름 변경</Title>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <AlbumNameInputWrapper onChange={onChangeName} value={newAlbumName} />
          <SaveBtnWrapper onClick={onClickSave}>저장하기</SaveBtnWrapper>
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
  font-size: 2.5rem;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
`;

const CloseBtn = styled.div`
  width: 100%;
  grid-column-start: 3;
  grid-column-end: 4;
  ${flexRowCenterAlign}

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

const AlbumNameInputWrapper = styled.input`
  margin-top: 5rem;
  width: 80%;
  height: 8vh;
  font-size: 15px;
  border: none;
  background: ${COLOR.GRAY};
  border-radius: 10px;
  font-size: 3rem;
  text-align: center;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
  }
`;

const SaveBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 10rem;
  height: 4rem;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  margin-top: 5rem;
  font-size: 1.6rem;
  &:hover {
    cursor: pointer;
    font-weight: bold;
  }
`;

export default UpdateAlbumModal;
