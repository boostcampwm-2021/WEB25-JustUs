import React, { useRef } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import shortid from "shortid";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";

interface FileObject {
  file: File | string;
  key: string;
}
interface UploadImageModalProps {
  changeMode: () => void;
  files: FileObject[];
  setFiles: React.Dispatch<React.SetStateAction<FileObject[]>>;
}

const UploadImageModal = ({ changeMode, files, setFiles }: UploadImageModalProps) => {
  const inputImagaRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE = 5;
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const clickInputTag = () => {
    if (!inputImagaRef.current || files.length === MAX_IMAGE) return;
    inputImagaRef.current.value = "";
    inputImagaRef.current.click();
  };

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFiles([...files, { file, key: shortid.generate() }]);
  };

  const nextModal = () => {
    changeMode();
  };

  const deleteImage = (key: string) => {
    setFiles(files.filter((file) => file.key !== key));
  };

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>{files.length ? "게시물 수정" : "새 게시물 만들기"}</ModalTitle>
        {files.length === 0 ? (
          <ModalHeaderRigthBtn onClick={closeModal}>
            <img src="/icons/x.svg" alt="close" height="90%"></img>
          </ModalHeaderRigthBtn>
        ) : (
          <ModalHeaderRigthBtn onClick={nextModal}>
            <img src="/icons/next.svg" alt="next" height="90%"></img>
          </ModalHeaderRigthBtn>
        )}
      </ModalHeader>
      <ModalContent>
        <UploadButton onClick={clickInputTag}>
          <img src="/icons/add-photo.svg" alt="add Photo"></img>
          <ImageInput ref={inputImagaRef} accept="image/*" type="file" onChange={changeImage}></ImageInput>
          <p>
            {files.length}/{MAX_IMAGE}
          </p>
        </UploadButton>
        {files.map(
          (fileObject) => (
            <ImagePreview key={shortid.generate()}>
              <DeleteImageBtn onClick={() => deleteImage(fileObject.key)}>
                <img src="/icons/delete.svg" alt="delete"></img>
              </DeleteImageBtn>
              <img
                src={typeof fileObject.file === "string" ? fileObject.file : URL.createObjectURL(fileObject.file)}
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

const DeleteImageBtn = styled.button`
  position: absolute;
  z-index: 1;
  right: -1vw;
  top: -1vw;
  height: 40px;
  width: 40px;
  border: none;
  background: none;
  cursor: pointer;
`;

const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;

const ImagePreview = styled.div`
  border: 1px solid ${COLOR.LIGHTGRAY1};
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1vw;
  vertical-align: middle;
  text-align: center;
  position: relative;
  min-height: 150px;
  & img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  width: 850px;
  height: 530px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.BLACK};
  font-size: max(1.2vw, 20px);
`;

const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  box-sizing: border-box;
`;

const UploadButton = styled.div`
  background-color: ${COLOR.LIGHTGRAY2};
  border: 1px solid ${COLOR.LIGHTGRAY1};
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1vw;
  display: flex;
  min-height: 150px;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  flex-direction: row;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
