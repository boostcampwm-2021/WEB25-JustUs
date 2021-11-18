import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@src/styles/StyledComponents";
import { userInfoUpdateAction, SET_UPDATED_INIT } from "@src/reducer/UserReducer";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const UserInfoModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [userImg, setUserImg] = useState("/icons/person.svg");
  const [imageFile, setImageFile] = useState<File>();
  const dispatch = useDispatch();
  const { updateSucceed } = useSelector((state: RootState) => state.user);

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
    setUserImg("/icons/person.svg");
  };

  const onClickUpdateBtn = () => {
    if (!userNameRef.current) return;
    if (userNameRef.current.value === "") {
      alert("닉네임은 반드시 입력해야 합니다.");
      return;
    }

    dispatch(userInfoUpdateAction({ updateUserNickName: userNameRef.current.value, updateUserProfile: imageFile }));
  };

  useEffect(() => {
    const updateSucceeded = () => {
      alert("회원정보가 수정되었습니다.");
      closeUserInfoModal();
      dispatch({ type: SET_UPDATED_INIT });
    };

    const updateFailed = () => {
      alert("회원정보 수정에 실패했습니다.");
    };

    if (updateSucceed === null) return;

    if (updateSucceed) {
      updateSucceeded();
      return;
    }

    updateFailed();
  }, [updateSucceed]);

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>회원 정보</Title>
          <CloseBtn>
            <button
              type="button"
              onClick={() => {
                closeUserInfoModal();
              }}
            >
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
        </Header>
        <Container>
          <Content>
            <ImageBackground userImg={userImg}>
              <img src={userImg} alt="person icon" ref={imageRef} width="100%" height="100%" />
            </ImageBackground>
            <UploadImgBtnWrapper onClick={onClickUploadBtn}>
              <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
              이미지 업로드
            </UploadImgBtnWrapper>
            <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>사진 제거</DeleteImgBtnWrapper>
            <UserNameInputWrapper placeholder="기존 닉네임" ref={userNameRef} />
            <SaveBtnWrapper onClick={onClickUpdateBtn}>저장하기</SaveBtnWrapper>
          </Content>
        </Container>
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

const Container = styled.div`
  margin: 0 10% 10% 10%;
`;

const Title = styled.div`
  font-size: 3.5rem;
  text-align: center;
  grid-column-start: 2;
  grid-column-end: 3;
`;
const CloseBtn = styled.div`
  width: 100%;
  ${flexRowCenterAlign};
  grid-column-start: 3;
  grid-column-end: 4;

  & > button {
    background-color: ${COLOR.WHITE};
    border: none;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  ${flexColumnCenterAlign}
`;

const ImageBackground = styled.div<{ userImg: string }>`
  margin-top: 4rem;
  width: 90px;
  height: 90px;
  background-color: ${(props) => props.theme.SECONDARY};
  opacity: ${(props) => (props.userImg === "/icons/person.svg" ? "0.4" : "")};
  border-radius: 100%;
  ${flexRowCenterAlign}
`;

const UploadImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 4rem;
  border-radius: 10px;
  border: 2px solid ${(props) => props.theme.PRIMARY};
  font-weight: bold;
  font-size: 1.6rem;
  line-height: 1rem;
  width: 150px;
  height: 33px;
  ${flexRowCenterAlign}
`;

const DeleteImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  color: ${COLOR.BLUE};
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
  cursor: pointer;
  width: 10rem;
  height: 4rem;
  border-radius: 1rem;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.PRIMARY};
  ${flexRowCenterAlign}
  margin-top: 4rem;
  font-size: 1.6rem;
`;

export default UserInfoModal;
