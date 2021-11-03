import React, { ChangeEventHandler, useRef, useState } from "react";
import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import Color from "@styles/Color";
import { GroupModalAction } from "@src/action";

interface CreateGroupModalProps {
  closeFn: () => void;
  open: boolean;
}

const CreateGroupModal = ({ closeFn, open = false }: CreateGroupModalProps) => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState("/icons/person.svg");

  const dispatch = useDispatch();
  const closeCreateGroupModal = () => {
    dispatch({ type: GroupModalAction.CLOSE_CREATE_GROUP_MODAL });
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
  };

  return (
    <Modal open={open} closeFn={closeFn}>
      <ModalContainer
        onClick={event => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <CloseBtn>
            <button
              type="button"
              onClick={() => {
                closeFn();
                closeCreateGroupModal();
              }}
            >
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
  background-color: #ffffff;
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
    background-color: white;
    border: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageBackground = styled.div<{ groupImg: string }>`
${flexCenterAlign}
  margin-top: 30px;
  width: 90px;
  height: 90px;
  background-color: ${Color["theme1-secondary"]};
  opacity: ${props => (props.groupImg === "/icons/person.svg" ? "0.4" : "")};
  border-radius: 100%;
`;

const UploadImgBtnWrapper = styled.div`
${flexCenterAlign}
  cursor: pointer;
  margin-top: 20px;
  border-radius: 10px;
  border: 2px solid ${Color["theme1-primary"]};
  font-weight: bold;
  font-size: 15px;
  line-height: 16px;
  width: 150px;
  height: 33px;
`;

const DeleteImgBtnWrapper = styled.div`
  cursor: pointer;
  margin-top: 20px;
  color: ${Color.blue};
  font-weight: bold;
`;

const GroupNameInputWrapper = styled.input`
  margin-top: 30px;
  border: none;
  width: 200px;
  font-size: 15px;
  border-bottom: 1px solid ${Color["theme1-primary"]};

  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 15px;
  }
`;

const CreateBtnWrapper = styled.div`
${flexCenterAlign}
  cursor: pointer;
  width: 160px;
  height: 39px;
  border-radius: 10px;
  color: ${Color.white};
  background-color: ${Color["theme1-primary"]};
  margin-top: 50px;
`;

export default CreateGroupModal;
