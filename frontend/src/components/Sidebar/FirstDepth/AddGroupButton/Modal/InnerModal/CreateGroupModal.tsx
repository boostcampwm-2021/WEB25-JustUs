import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { createGroupAction } from "@src/reducer/GroupReducer";
import { SET_ERROR_TOAST } from "@src/reducer/ToastReducer";
import { useResizeFile } from "@src/hooks/useResizeFile";

const CreateGroupModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState<string>("");
  const { files, addFile, clearFiles } = useResizeFile();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickUploadBtn = () => {
    if (uploadBtnRef.current === null) return;
    uploadBtnRef.current.click();
    (groupNameRef.current as HTMLInputElement).focus();
  };
  const loadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newfiles = event.target.files;
    if (!newfiles) return;
    const file = newfiles[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      if (!imageRef.current) return;
      if (!e.target.result) return;
      setGroupImg("");
      clearFiles();
      addFile(file);
      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (files[0] && typeof files[0].imageUrl !== "string") setGroupImg(URL.createObjectURL(files[0].imageUrl as Blob));
  }, [files]);

  const onClickDeleteBtn = () => {
    setGroupImg("");
    clearFiles();
  };

  const onClickCreateBtn = () => {
    if (!groupNameRef.current) return;
    if (groupNameRef.current.value === "") {
      dispatch({ type: SET_ERROR_TOAST, payload: { text: "그룹 이름은 반드시 입력해야 합니다." } });
      return;
    }

    createGroup();
  };

  const createGroup = () => {
    if (!groupNameRef.current) return;
    const groupName = groupNameRef.current.value;

    dispatch(createGroupAction({ groupName, groupImage: files[0]?.imageUrl }));

    closeModal();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") onClickCreateBtn();
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
          <div>
            <ImageBackground>
              <img
                src={groupImg ? groupImg : "/icons/podo-many-high.png"}
                alt="default icon"
                ref={imageRef}
                width="100%"
                height="100%"
              />
              {groupImg ? (
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
            <GroupNameInputWrapper placeholder="그룹 이름을 입력해주세요" ref={groupNameRef} onKeyDown={onKeyDown} />
            <CreateBtnWrapper onClick={onClickCreateBtn}>생성하기</CreateBtnWrapper>
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

const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  justify-items: center;
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

const GroupNameInputWrapper = styled.input`
  margin-top: 4rem;
  border: none;
  width: 23rem;
  font-size: 1.6rem;
  border-bottom: 1px solid ${(props) => props.theme.PRIMARY};
  &::-webkit-input-placeholder {
    text-align: center;
    font-weight: 800;
    font-size: 1.6rem;
  }
  &:focus {
    outline: none;
  }
`;

const CreateBtnWrapper = styled.div`
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

export default CreateGroupModal;
