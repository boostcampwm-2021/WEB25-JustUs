import { useRef } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction } from "@src/action";

const UpdateAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.uploadModal);
  const inputRef = useRef<HTMLInputElement>(null);
  const { groups, selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };
  const onClickSave = () => {
    if (!inputRef.current) return;

    const selectedGroupID = selectedGroup.groupID;
    const selectedAlbumList = groups[selectedGroupID].albumList;
    const albumID = selectedAlbum.albumID;
    const albumName = inputRef.current.value;
    const targetIdx = selectedAlbumList.findIndex((album: any) => album.albumID === albumID);

    selectedAlbumList[targetIdx].albumName = albumName;

    dispatch({ type: GroupAction.SET_ALL_GROUPS, payload: groups });
    dispatch({ type: "CLOSE_MODAL" });
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
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Title>앨범 이름 변경</Title>
          <Content>
            <AlbumNameInputWrapper ref={inputRef} placeholder={selectedAlbum.albumName} />
            <SaveBtnWrapper onClick={onClickSave}>저장하기</SaveBtnWrapper>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 40vh;
  min-width: 30vw;
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
  margin-top: 2rem;
`;

const AlbumNameInputWrapper = styled.input`
  margin-top: 30px;
  width: 80%;
  height: 8vh;
  font-size: 15px;
  border: none;
  background: ${COLOR.GRAY};
  border-radius: 10px;
  font-size: 30px;
  text-align: center;

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 30px;
  }
`;

const SaveBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.THEME1.PRIMARY};
  margin-top: 50px;
  font-size: 30px;
  cursor: pointer;
`;

export default UpdateAlbumModal;
