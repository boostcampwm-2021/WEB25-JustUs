import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction } from "@src/action";

const DeleteAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.modal);
  const { groups, selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickCancelBtn = () => {
    closeModal();
  };

  const onClickDeleteBtn = () => {
    console.log("로직 변경 예정");
    //   const { groupID, groupName, groupImg } = selectedGroup;
    //   const selectedAlbumList = groups[groupID].albumList;

    //   groups[groupID].albumList = selectedAlbumList.filter((album: any) => album.albumID !== selectedAlbum.albumID);

    //   const newGroup = {
    //     groupID,
    //     groupName,
    //     groupImg,
    //     albumList: groups[groupID].albumList,
    //   };

    //   dispatch({ type: GroupAction.SET_ALL_GROUPS, payload: groups });
    //   dispatch({ type: GroupAction.SET_SELECTED_GROUP, payload: newGroup });
    //   closeModal();
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

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 35vh;
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
