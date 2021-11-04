import React, { useRef, useState } from "react";
import styled from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { flexColumnCenterAlign, flexRowCenterAlign } from "@src/styles/StyledComponents";

const UserInfoModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const [userImg, setUserImg] = useState("/icons/person.svg");

  const dispatch = useDispatch();
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
    };

    reader.readAsDataURL(file);
  };

  const onClickDeleteBtn = () => {
    setUserImg("/icons/person.svg");
  };

  const onClickCreateBtn = () => {
    if (!userNameRef.current) return;
    if (userNameRef.current.value === "") {
      alert("닉네임은 반드시 입력해야 합니다.");
      return;
    }
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
            <button
              type="button"
              onClick={() => {
                closeUserInfoModal();
              }}
            >
              <img src="/icons/clear.svg" alt="clear icon" />
            </button>
          </CloseBtn>
          <Container>
            <Title>회원 정보</Title>
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
              <SaveBtnWrapper onClick={onClickCreateBtn}>저장하기</SaveBtnWrapper>
            </Content>
          </Container>
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
  ${flexColumnCenterAlign}
`;

const Container = styled.div`
  margin: 0 10% 10% 10%;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
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
    &:hover {
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  ${flexColumnCenterAlign}
`;

const ImageBackground = styled.div<{ userImg: string }>`
  margin-top: 30px;
  width: 90px;
  height: 90px;
  background-color: ${COLOR.THEME1.SECONDARY};
  opacity: ${(props) => (props.userImg === "/icons/person.svg" ? "0.4" : "")};
  border-radius: 100%;
  ${flexRowCenterAlign}
`;

const UploadImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  border: 2px solid ${COLOR.THEME1.PRIMARY};
  font-weight: bold;
  font-size: 15px;
  line-height: 16px;
  width: 150px;
  height: 33px;
  ${flexRowCenterAlign}
`;

const DeleteImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  color: ${COLOR.BLUE};
  font-weight: bold;
`;

const UserNameInputWrapper = styled.input`
  margin-top: 30px;
  border: none;
  width: 200px;
  font-size: 15px;
  border-bottom: 1px solid ${COLOR.THEME1.PRIMARY};

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 1rem;
  }
  &:focus-visible {
    outline: none;
  }
`;

const SaveBtnWrapper = styled.div`
  cursor: pointer;
  width: 10rem;
  height: 2.5rem;
  border-radius: 1rem;
  color: ${COLOR.WHITE};
  background-color: ${COLOR.THEME1.PRIMARY};
  ${flexRowCenterAlign}
  margin-top: 3rem;
`;

export default UserInfoModal;
