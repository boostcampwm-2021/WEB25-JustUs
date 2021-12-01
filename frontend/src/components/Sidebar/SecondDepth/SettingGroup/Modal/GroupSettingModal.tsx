import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  mideumModalContainer,
  mideumModalHeader,
  mideumModalTitle,
  mideumModalCloseButton,
  mideumModalContent,
  mideumImageBackground,
  mideumImageSize,
  mideumDeleteButton,
  mideumInputWrapper,
  mideumGridRow,
  mideumBottomLeftButton,
  mideumBottomRightButton,
} from "@src/styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch, useSelector } from "react-redux";
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
              <Image>
                <img src={nowImg ? nowImg : icon.podoManyHigh} alt="default icon" ref={imageRef} />
              </Image>
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

const ModalContainer = styled.div`
  ${mideumModalContainer}
`;
const Header = styled.div`
  ${mideumModalHeader}
`;
const Title = styled.div`
  ${mideumModalTitle}
`;
const CloseButton = styled.button`
  ${mideumModalCloseButton}
`;
const Content = styled.div`
  ${mideumModalContent}
`;
const GridLeft = styled.div`
  ${mideumGridRow}
`;
const ImageBackground = styled.div`
  ${mideumImageBackground}
`;
const Image = styled.div`
  & > img {
    ${mideumImageSize}
  }
`;
const DeleteImgBtnWrapper = styled.div`
  ${mideumDeleteButton}
`;
const UploadImgBtnWrapper = styled.div`
  ${mideumBottomLeftButton}
`;
const GridRight = styled.div`
  ${mideumGridRow}
`;
const GroupNameInputWrapper = styled.input`
  ${mideumInputWrapper}
`;
const CreateBtnWrapper = styled.div`
  ${mideumBottomRightButton}
`;

export default GroupSettingModal;
