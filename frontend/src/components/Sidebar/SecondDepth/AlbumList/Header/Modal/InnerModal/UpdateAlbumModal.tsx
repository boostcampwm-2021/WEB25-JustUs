import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction } from "@src/action";

const UpdateAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.modal);
  const inputRef = useRef<HTMLInputElement>(null);
  const { groups, selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickSave = () => {
    console.log("로직 수정 예정");
    // if (!inputRef.current) return;

    // const selectedGroupID = selectedGroup.groupID;
    // const selectedAlbumList = groups[selectedGroupID].albumList;
    // const albumID = selectedAlbum.albumID;
    // const albumName = inputRef.current.value;
    // const targetIdx = selectedAlbumList.findIndex((album: any) => album.albumID === albumID);

    // selectedAlbumList[targetIdx].albumName = albumName;

    // dispatch({ type: GroupAction.SET_ALL_GROUPS, payload: groups });
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
          <AlbumNameInputWrapper ref={inputRef} placeholder={selectedAlbum.albumName} />
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
  min-height: 40vh;
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

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 3rem;
  }
`;

const SaveBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 7vw;
  height: 5vh;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  margin-top: 5rem;
  cursor: pointer;
  font-size: 1.5vw;
`;

export default UpdateAlbumModal;
