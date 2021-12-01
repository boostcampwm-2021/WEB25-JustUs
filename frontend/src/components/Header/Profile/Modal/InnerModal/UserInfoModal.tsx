import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import {
  flexRowCenterAlign,
  mideumModalContainer,
  mideumModalHeader,
  mideumModalTitle,
  mideumModalCloseButton,
  mideumModalContent,
  mideumImageBackground,
  mideumImageSize,
  mideumDeleteButton,
  mideumBottomButton,
  mideumInputWrapper,
  mideumGridRow,
  mideumBottomLeftButton,
  mideumBottomRightButton,
} from "@src/styles/StyledComponents";
import { UserAction, ToastAction, ModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useResizeFile } from "@src/hooks/useResizeFile";
import { icon, toastMessage } from "@src/constants/";

const UserInfoModal = () => {
  const uploadBtnRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { files, addFile, clearFiles } = useResizeFile();
  const dispatch = useDispatch();
  const { userNickName, userProfile } = useSelector((state: RootState) => state.user);
  const [userImg, setUserImg] = useState<string>(userProfile);
  const [newName, setNewName] = useState<string>(userNickName);
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultImageURL = "https://kr.object.ncloudstorage.com/justus/base/user_base.png";

  const closeUserInfoModal = () => {
    dispatch(ModalAction.closeModalAction());
  };
  const onClickUploadBtn = () => {
    if (uploadBtnRef.current === null) return;
    uploadBtnRef.current.click();
    (inputRef.current as HTMLInputElement).focus();
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
      setUserImg("");
      clearFiles();
      addFile(file);
      event.target.value = "";
    };
    if (file) reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (files[0] && typeof files[0].imageUrl !== "string") setUserImg(URL.createObjectURL(files[0].imageUrl as Blob));
  }, [files]);

  const onClickDeleteBtn = () => {
    setUserImg("");
    clearFiles();
  };

  const onClickUpdateBtn = () => {
    if (!newName) {
      dispatch(ToastAction.setErrorToastAction({ text: toastMessage.requiredUserName }));
      return;
    }

    dispatch(
      UserAction.userInfoUpdateAction({
        updateUserNickName: newName,
        updateUserProfile: userImg ? files[0]?.imageUrl : "deleted",
      }),
    );
    closeUserInfoModal();
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
          <Title>회원 정보</Title>
          <CloseButton type="button" onClick={closeUserInfoModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <GridLeft>
            <ImageBackground>
              <Image>
                <img
                  src={userImg ? userImg : icon.person}
                  alt="person icon"
                  ref={imageRef}
                  width="100%"
                  height="100%"
                />
              </Image>
              {userImg && userImg !== defaultImageURL ? (
                <DeleteImgBtnWrapper onClick={onClickDeleteBtn}>
                  <img src={icon.delete} alt="delete button"></img>
                </DeleteImgBtnWrapper>
              ) : null}
            </ImageBackground>
            <UploadImgBtnWrapper onClick={onClickUploadBtn}>
              <input type="file" accept="image/*" hidden ref={uploadBtnRef} onChange={loadImage} />
              <img src={icon.addPhoto} alt="find Profile" width={"20rem"}></img>
              사진 찾기
            </UploadImgBtnWrapper>
          </GridLeft>
          <GridRight>
            <UserNameInputWrapper
              value={newName}
              spellCheck={false}
              onChange={handleNameChange}
              onKeyDown={onKeyDown}
              ref={inputRef}
            />
            <SaveBtnWrapper onClick={onClickUpdateBtn}>저장하기</SaveBtnWrapper>
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
const UserNameInputWrapper = styled.input`
  ${mideumInputWrapper}
`;
const SaveBtnWrapper = styled.div`
  ${mideumBottomRightButton}
`;

export default UserInfoModal;
