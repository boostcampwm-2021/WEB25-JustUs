import React, { useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { createGroupAction } from "@src/reducer/GroupReducer";

const CreateGroupModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState<string>("");
  const [imageFile, setImageFile] = useState<File>();
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

    reader.onload = (e) => {
      if (!e.target) return;
      if (!imageRef.current) return;
      if (!e.target.result) return;
      setGroupImg(e.target.result as string);
      setImageFile(file as File);
    };

    reader.readAsDataURL(file);
  };

  const onClickDeleteBtn = () => {
    setGroupImg("");
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
    const groupName = groupNameRef.current.value;

    dispatch(createGroupAction({ groupName, groupImage: imageFile }));

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
          <TitleWrapper>
            <div>그룹 생성</div>
          </TitleWrapper>
          <CloseBtn>
            <button type="button" onClick={closeModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <ImageBackground>
            <img
              src={groupImg ? groupImg : "/icons/podo-many.png"}
              alt="default icon"
              ref={imageRef}
              width="100%"
              height="100%"
            />
          </ImageBackground>
          <UploadImgBtnWrapper onClick={onClickUploadBtn}>
            <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
            이미지 업로드
          </UploadImgBtnWrapper>
          <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>사진 제거</DeleteImgBtnWrapper>
          <GroupNameInputWrapper placeholder="그룹 이름을 입력해주세요" ref={groupNameRef} />
          <CreateBtnWrapper onClick={onClickCreateBtn}>생성하기</CreateBtnWrapper>
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
  min-height: 55rem;
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

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 2.5rem;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
`;

const CloseBtn = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  width: 100%;
  ${flexRowCenterAlign};

  & > button {
    background: transparent;
    border: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBackground = styled.div`
  ${flexRowCenterAlign}
  margin-top: 4rem;
  width: 10rem;
  height: 10rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1vw;
  border: 5px solid ${(props) => props.theme.SECONDARY};
  & img {
    border-radius: 0.5vw;
  }
`;

const UploadImgBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  margin-top: 4rem;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.PRIMARY};
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 16px;
  width: 150px;
  height: 33px;
`;

const DeleteImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 4rem;
  color: ${COLOR.RED};
  font-weight: bold;
  font-size: 1.6rem;
`;

const GroupNameInputWrapper = styled.input`
  margin-top: 4rem;
  border: none;
  width: 200px;
  font-size: 1.6rem;
  border-bottom: 1px solid ${(props) => props.theme.PRIMARY};
  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 1.6rem;
  }
`;

const CreateBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  width: 10rem;
  height: 4rem;
  border-radius: 10px;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  margin-top: 4rem;
  font-size: 1.5rem;
`;

export default CreateGroupModal;
