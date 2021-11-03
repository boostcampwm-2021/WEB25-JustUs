import React, { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";
import shortid from "shortid";
import color from "@styles/Color";

interface UploadImageModalProps {
  closeFn: () => void;
}

interface FileObject {
  File: File;
  Key: string;
}

const UploadImageModal = ({ closeFn }: UploadImageModalProps) => {
  const [files, setFiles] = useState<FileObject[]>([]);
  const inputImagaRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE = 5;

  const clickInputTag = () => {
    if (!inputImagaRef.current || files.length === MAX_IMAGE) return;
    inputImagaRef.current.value = "";
    inputImagaRef.current.click();
  };

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFiles([...files, { File: file, Key: shortid.generate() }]);
  };

  const nextModal = () => {
    console.log("클릭");
  };

  const deleteImage = (key: string) => {
    setFiles(files.filter(file => file.Key !== key));
  };

  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        {files.length === 0 ? (
          <ModalClose onClick={closeFn}>
            <img src="/icons/x.svg" alt="close" height="60%"></img>
          </ModalClose>
        ) : (
          <ModalNext onClick={nextModal}>
            <img src="/icons/next.svg" alt="next" height="60%"></img>
          </ModalNext>
        )}
      </ModalHeader>
      <ModalContent>
        <UploadButton onClick={clickInputTag}>
          <img src="/icons/add-photo.svg" alt="close"></img>
          <ImageInput ref={inputImagaRef} accept="image/*" type="file" onChange={changeImage}></ImageInput>
          <p>
            {files.length}/{MAX_IMAGE}
          </p>
        </UploadButton>
        {files.map(
          fileObject => (
            <ImagePreview key={shortid.generate()}>
              <DeleteImageBtn onClick={() => deleteImage(fileObject.Key)}>
                <img src="/icons/delete.svg" alt="delete"></img>
              </DeleteImageBtn>
              <img src={URL.createObjectURL(fileObject.File)} alt="close"></img>
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

const ModalNext = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  right: 0px;
  top: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ModalClose = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  right: 0px;
  top: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
`;

const ImagePreview = styled.div`
  border: 1px solid ${color.lightgray1};
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
  background-color: ${color.white};
  height: 30vw;
  width: 45vw;
  min-width: 500px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 ${color.shadowBlack};
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 4vw;
  box-sizing: border-box;
  border-bottom: 1px solid ${color.black};
  font-size: max(1.2vw, 20px);
`;

const ModalContent = styled.div`
  display: grid;
  height: 26vw;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  box-sizing: border-box;
`;

const UploadButton = styled.div`
  background-color: ${color.lightgray2};
  border: 1px solid ${color.lightgray1};
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
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
