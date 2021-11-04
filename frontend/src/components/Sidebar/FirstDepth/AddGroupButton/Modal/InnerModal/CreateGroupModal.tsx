import React, { ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { GroupAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface Group {
  groupID: number;
  groupName: string;
  img: string;
}

const CreateGroupModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState("/icons/person.svg");
  const { groups }: any = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickUploadBtn = () => {
    if (uploadBtnRef.current === null) return;
    uploadBtnRef.current.click();
  };
  const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = e => {
      if (!e.target) return;
      if (!imageRef.current) return;
      if (!e.target.result) return;

      setGroupImg(e.target.result as string);
    };

    reader.readAsDataURL(file);
  };

  const onClickDeleteBtn = () => {
    setGroupImg("/icons/person.svg");
  };

  const onClickCreateBtn = () => {
    if (!groupNameRef.current) return;
    if (groupNameRef.current.value === "") {
      alert("그룹 이름은 반드시 입력해야 합니다.");
      return;
    }

    createGroup();
  };

  const createGroup = () => {
    if (!groupNameRef.current) return;

    const groupID = groups.length ? groups[groups.length - 1].groupID + 1 : 0;
    const albumList = groups[groups.length - 1].albumList;
    const albumID = albumList[albumList.length - 1].albumID + 1;
    const groupName = groupNameRef.current.value;
    const newGroup = {
      groupID,
      groupName,
      groupImg,
      albumList: [{ albumID, albumName: "기본 앨범", posts: [] }],
    };

    dispatch({ type: GroupAction.ADD_GROUP, payload: newGroup });
    closeModal();
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
          <Title>새 그룹 생성</Title>
          <Content>
            <ImageBackground groupImg={groupImg}>
              <img src={groupImg} alt="person icon" ref={imageRef} width="100%" height="100%" />
            </ImageBackground>
            <UploadImgBtnWrapper onClick={onClickUploadBtn}>
              <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
              이미지 업로드
            </UploadImgBtnWrapper>
            <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>사진 제거</DeleteImgBtnWrapper>
            <GroupNameInputWrapper placeholder="그룹 이름을 입력해주세요" ref={groupNameRef} />
            <CreateBtnWrapper onClick={onClickCreateBtn}>생성하기</CreateBtnWrapper>
          </Content>
        </Header>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  background-color: ${COLOR.WHITE};
  min-height: 30vw;
  min-width: 40vw;
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
  margin-top: 20px;
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

const ImageBackground = styled.div<{ groupImg: string }>`
  ${flexRowCenterAlign}
  margin-top: 30px;
  width: 90px;
  height: 90px;
  background-color: ${COLOR.THEME1.SECONDARY};
  opacity: ${props => (props.groupImg === "/icons/person.svg" ? "0.4" : "")};
  border-radius: 100%;
`;

const UploadImgBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  border: 2px solid ${COLOR.THEME1.PRIMARY};
  font-weight: bold;
  font-size: 15px;
  line-height: 16px;
  width: 150px;
  height: 33px;
`;

const DeleteImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  color: ${COLOR.BLUE};
  font-weight: bold;
`;

const GroupNameInputWrapper = styled.input`
  margin-top: 30px;
  border: none;
  width: 200px;
  font-size: 15px;
  border-bottom: 1px solid ${COLOR.THEME1.PRIMARY};

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 15px;
  }
`;

const CreateBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.THEME1.PRIMARY};
  margin-top: 50px;
`;

export default CreateGroupModal;
