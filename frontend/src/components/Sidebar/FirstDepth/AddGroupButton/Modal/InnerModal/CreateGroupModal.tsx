import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
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
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { GroupAction, ToastAction, ModalAction } from "@src/action";
import { useResizeFile } from "@src/hooks/useResizeFile";
import { icon, toastMessage } from "@src/constants";

const CreateGroupModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const groupNameRef = useRef<HTMLInputElement>(null);
  const [groupImg, setGroupImg] = useState<string>("");
  const { files, addFile, clearFiles } = useResizeFile();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
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
      dispatch(ToastAction.setErrorToastAction({ text: toastMessage.requiredGroupName }));
      return;
    }

    createGroup();
  };

  const createGroup = () => {
    if (!groupNameRef.current) return;
    const groupName = groupNameRef.current.value;

    dispatch(GroupAction.createGroupAction({ groupName, groupImage: files[0]?.imageUrl }));

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
          <Title>그룹 생성</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <GridLeft>
            <ImageBackground>
              <img
                src={groupImg ? groupImg : icon.podoManyHigh}
                alt="default icon"
                ref={imageRef}
                width="100%"
                height="100%"
              />
              {groupImg ? (
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
            <GroupNameInputWrapper placeholder="그룹 이름을 입력해주세요" ref={groupNameRef} onKeyDown={onKeyDown} />
            <CreateBtnWrapper onClick={onClickCreateBtn}>생성하기</CreateBtnWrapper>
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
const UploadImgBtnWrapper = styled.div`
  ${mideumBottomLeftButton}
`;
const DeleteImgBtnWrapper = styled.div`
  ${mideumDeleteButton}
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

export default CreateGroupModal;
