import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import {
  flexRowCenterAlign,
  smallModalContainer,
  smallModalHeader,
  smallModalTitle,
  smallModalCloseButton,
} from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch, useSelector } from "react-redux";
import COLOR from "@styles/Color";
import { RootState } from "@src/reducer";
import { GroupAction, ToastAction, ModalAction } from "@src/action";
import { useResizeFile } from "@src/hooks/useResizeFile";
import { icon, toastMessage } from "@src/constants";

const GroupSettingModal = () => {
  const { selectedGroup, albumList }: any = useSelector((state: RootState) => state.groups);
  const [nowImg, setNowImg] = useState(selectedGroup.groupImage);
  const [newName, setNewName] = useState(selectedGroup.groupName);
  const { files, addFile, clearFiles } = useResizeFile();
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dispatch = useDispatch();
  const defaultImageURL = "https://kr.object.ncloudstorage.com/justus/base/podo-many.png";

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onClickUpdateBtn = () => {
    if (!newName) {
      dispatch(ToastAction.setErrorToastAction({ text: toastMessage.requiredGroupName }));
      return;
    }
    updateGroup();
  };

  const updateGroup = () => {
    dispatch(
      GroupAction.updateGroupAction({
        groupId: selectedGroup.groupId,
        groupName: newName,
        groupImage: files[0]?.imageUrl,
        albumList,
        clearImage: nowImg ? 0 : 1,
      }),
    );
    closeModal();
  };

  const onClickUploadBtn = () => {
    if (uploadBtnRef.current === null) return;
    uploadBtnRef.current.click();
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
      setNowImg("");
      clearFiles();
      addFile(file);
      event.target.value = "";
    };
    if (file) reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (files[0] && typeof files[0].imageUrl !== "string") setNowImg(URL.createObjectURL(files[0].imageUrl as Blob));
  }, [files]);

  const onClickDeleteBtn = () => {
    setNowImg("");
    clearFiles();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") onClickUpdateBtn();
  };

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>그룹 수정</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <GridLeft>
            <ImageBackground>
              <img
                src={nowImg ? nowImg : icon.podoManyHigh}
                alt="default icon"
                ref={imageRef}
                width="100%"
                height="100%"
              />
              {nowImg && nowImg !== defaultImageURL ? (
                <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>
                  <img src={icon.delete} alt="delete button"></img>
                </DeleteImgBtnWrapper>
              ) : null}
            </ImageBackground>
            <UploadImgBtnWrapper onClick={onClickUploadBtn}>
              <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
              <img src={icon.addPhoto} alt="add Post" width={"20rem"}></img>
              사진 찾기
            </UploadImgBtnWrapper>
          </GridLeft>
          <GridRight>
            <GroupNameInputWrapper
              value={newName}
              spellCheck={false}
              onChange={handleNameChange}
              onKeyDown={onKeyDown}
            />
            <CreateBtnWrapper onClick={onClickUpdateBtn}>수정하기</CreateBtnWrapper>
          </GridRight>
        </Content>
      </ModalContainer>
    </Modal>
  );
};
const gridRow = css`
  display: grid;
  grid-template-rows: 80% 20%;
`;
const GridLeft = styled.div`
  ${gridRow}
`;
const GridRight = styled.div`
  ${gridRow}
`;

const ModalContainer = styled.div`
  ${smallModalContainer}
`;

const Header = styled.div`
  ${smallModalHeader}
`;
const Title = styled.div`
  ${smallModalTitle}
`;
const CloseButton = styled.button`
  ${smallModalCloseButton}
`;
const Content = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
`;
const ImageBackground = styled.div`
  margin: auto;
  width: 12rem;
  height: 12rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  border: 0.5rem solid ${(props) => props.theme.SECONDARY};
  & img {
    border-radius: 0.3rem;
    width: 100%;
    height: 100%;
  }
  position: relative;
`;

const UploadImgBtnWrapper = styled.div`
  margin: auto;
  ${flexRowCenterAlign}
  cursor: pointer;
  border-radius: 1rem;
  border: 2px solid ${COLOR.SHADOW_BLACK};
  font-weight: bold;
  font-size: 1.5rem;
  color: ${COLOR.SHADOW_BLACK};
  line-height: 16px;
  width: 15rem;
  height: 3rem;
`;
const DeleteImgBtnWrapper = styled.div`
  width: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  color: ${COLOR.RED};
  font-weight: bold;
`;
const GroupNameInputWrapper = styled.input`
  border: none;
  width: 90%;
  height: 2rem;
  margin: auto;
  font-size: 1.6rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.PRIMARY};
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
  margin: auto;
  cursor: pointer;
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.SECONDARY};
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.5rem;
  width: 15rem;
  height: 3rem;
  &:hover {
    background-color: ${(props) => props.theme.PRIMARY};
  }
`;

export default GroupSettingModal;
