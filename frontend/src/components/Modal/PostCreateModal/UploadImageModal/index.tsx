import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import styled, { css } from "styled-components";
import {
  flexRowCenterAlign,
  modalTitleFont,
  modalSlideUpAnimation,
  modalHeaderButtonIcon,
  modalContainerSize,
  iconHover,
} from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { ModalAction } from "@src/action";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface UploadImageModalProps {
  changeMode: () => void;
  files: FileObject[];
  addFile: Function;
  removeFile: Function;
}

const UploadImageModal = ({ changeMode, files, addFile, removeFile }: UploadImageModalProps) => {
  const inputImagaRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE = 5;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const clickInputTag = () => {
    if (!inputImagaRef.current || files.length === MAX_IMAGE) return;
    inputImagaRef.current.value = "";
    inputImagaRef.current.click();
  };

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    addFile(event.target.files[0]);
  };

  const nextModal = () => {
    changeMode();
  };

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle className="modaltitle">사진 업로드</ModalTitle>
        {files.length === 0 ? (
          <ModalHeaderRigthBtn className="modalHeaderRightBtn" onClick={closeModal}>
            <img src="/icons/x.svg" alt="close"></img>
          </ModalHeaderRigthBtn>
        ) : (
          <ModalHeaderRigthBtn className="modalHeaderRightBtn" onClick={nextModal}>
            <img src="/icons/next.svg" alt="next"></img>
          </ModalHeaderRigthBtn>
        )}
      </ModalHeader>
      <ModalContent>
        <UploadButton onClick={clickInputTag}>
          <img src="/icons/add-photo.svg" alt="add"></img>
          <ImageInput ref={inputImagaRef} accept="image/*" type="file" onChange={changeImage}></ImageInput>
          <p>
            {files.length}/{MAX_IMAGE}
          </p>
        </UploadButton>
        {files.map(
          (fileObject) => (
            <ImagePreview key={shortid.generate()}>
              <DeleteImageBtn onClick={() => removeFile(fileObject)}>
                <img src="/icons/delete.svg" alt="delete" width="100%"></img>
              </DeleteImageBtn>
              <img
                src={
                  typeof fileObject.imageUrl === "string"
                    ? fileObject.imageUrl
                    : URL.createObjectURL(fileObject.imageUrl)
                }
              ></img>
            </ImagePreview>
          ),
          "",
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadImageModal;

const ModalContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 90%;
  background-color: ${COLOR.WHITE};
  ${modalContainerSize};
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
  ${modalSlideUpAnimation}
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 100%;
  box-sizing: border-box;
`;
const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  ${modalTitleFont}
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  & > img {
    ${modalHeaderButtonIcon};
    ${iconHover};
  }
`;
const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  box-sizing: border-box;
  margin: 0 1.5rem;
`;
const uploadImage = css`
  border: 1px solid ${COLOR.LIGHTGRAY1};
  box-sizing: border-box;
  border-radius: 1rem;
  min-height: 15rem;

  margin: 1rem 1rem 1rem 0;
  &:nth-child(3n + 1) {
    margin-left: 1rem;
  }
`;

const UploadButton = styled.div`
  background-color: ${COLOR.LIGHTGRAY2};
  ${uploadImage}
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  cursor: pointer;
  position: relative;

  & > p {
    ${modalTitleFont}
    font-weight: normal;
    position: absolute;
    bottom: 1rem;
  }
  & > img {
    width: 8rem;
  }
  &:hover {
    background-color: ${COLOR.LIGHTGRAY1};
  }
`;
const ImageInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const ImagePreview = styled.div`
  ${uploadImage}
  vertical-align: middle;
  text-align: center;
  position: relative;
  & img {
    position: absolute;
    max-height: 95%;
    max-width: 95%;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;
const DeleteImageBtn = styled.button`
  position: absolute;
  z-index: 1;
  border: none;
  background: none;
  cursor: pointer;
  ${modalHeaderButtonIcon}
  right: -1rem;
  top: -1rem;
  &:hover {
    width: 2.6rem;
    height: 2.6rem;
  }
`;
