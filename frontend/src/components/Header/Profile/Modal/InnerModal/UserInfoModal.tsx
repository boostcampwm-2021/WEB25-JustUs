import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { userInfoUpdateAction, SET_UPDATED_INIT } from "@src/reducer/UserReducer";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const UserInfoModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useDispatch();
  const { userNickName, userProfile, updateSucceed } = useSelector((state: RootState) => state.user);
  const [userImg, setUserImg] = useState<string>(userProfile);
  const [newName, setNewName] = useState<string>(userNickName);

  const closeUserInfoModal = () => {
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
      setUserImg(e.target.result as string);
      setImageFile(file as File);
    };
    reader.readAsDataURL(file);
  };

  const onClickDeleteBtn = () => {
    setUserImg("");
  };

  const onClickUpdateBtn = () => {
    if (!newName) {
      alert("닉네임은 반드시 입력해야 합니다.");
      return;
    }
    dispatch(userInfoUpdateAction({ updateUserNickName: newName, updateUserProfile: imageFile }));
    closeUserInfoModal();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <TitleWrapper>회원 정보</TitleWrapper>
          <CloseBtn>
            <button type="button" onClick={closeUserInfoModal}>
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Content>
          <div>
            <ImageBackground>
              <img
                src={userImg ? userImg : "/icons/person.jpeg"}
                alt="person icon"
                ref={imageRef}
                width="100%"
                height="100%"
              />
              {userImg ? (
                <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>
                  <img src="/icons/delete.svg" alt="delete button"></img>
                </DeleteImgBtnWrapper>
              ) : null}
            </ImageBackground>
            <UploadImgBtnWrapper onClick={onClickUploadBtn}>
              <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
              <img src="/icons/add-photo.svg" alt="add Photo" width={"20rem"}></img>
              사진 찾기
            </UploadImgBtnWrapper>
          </div>
          <GridRight>
            <UserNameInputWrapper value={newName} spellCheck={false} onChange={handleNameChange} />
            <SaveBtnWrapper onClick={onClickUpdateBtn}>저장하기</SaveBtnWrapper>
          </GridRight>
        </Content>
      </ModalContainer>
    </Modal>
  );
};
const GridRight = styled.div`
  ${flexRowCenterAlign}
  height:100%;
  flex-direction: column;
  justify-content: flex-end;
  padding-right: 2rem;
`;

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
  min-height: 38rem;
  min-width: 50rem;
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
`;

const TitleWrapper = styled.div`
  text-align: center;
  font-size: 2.5rem;
  grid-column-start: 2;
  grid-column-end: 3;
  ${flexRowCenterAlign}
`;
const CloseBtn = styled.div`
  width: 100%;
  ${flexRowCenterAlign};
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

const ImageBackground = styled.div`
  ${flexRowCenterAlign}
  margin-top: 4rem;
  width: 15rem;
  height: 15rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1vw;
  border: 6px solid ${(props) => props.theme.SECONDARY};
  & img {
    border-radius: 0.6vw;
  }
  position: relative;
`;

const UploadImgBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  margin-top: 1rem;
  border-radius: 10px;
  border: 2px solid ${COLOR.SHADOW_BLACK};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${COLOR.SHADOW_BLACK};
  line-height: 16px;
  width: 15rem;
  height: 3rem;
`;

const DeleteImgBtnWrapper = styled.div`
  position: absolute;
  bottom: 13rem;
  left: 13rem;
  cursor: pointer;
  margin-top: 4rem;
  color: ${COLOR.RED};
  font-weight: bold;
  font-size: 1.6rem;
`;

const UserNameInputWrapper = styled.input`
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
  &:focus-visible {
    outline: none;
  }
`;

const SaveBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  cursor: pointer;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.SECONDARY};
  margin-top: 4rem;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 16px;
  width: 15rem;
  height: 3rem;
  &:hover {
    background-color: ${(props) => props.theme.PRIMARY};
  }
`;

export default UserInfoModal;
