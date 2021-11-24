import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import shortid from "shortid";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clickInputTag = () => {
    if (!inputImagaRef.current || files.length === MAX_IMAGE) return;
    inputImagaRef.current.value = "";
    inputImagaRef.current.click();
  };

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    getThumbFile(event.target.files[0]);
  };

  const nextModal = () => {
    changeMode();
  };

  const deleteImage = (deleteItem: FileObject) => {
    setFiles(files.filter((file) => file.imageId !== deleteItem.imageId));
  };

  const getThumbFile = (file: any) => {
    const MB = 1048567;
    const baseSize = MB * 4;
    const compSize = MB;
    if (file.size <= baseSize) {
      setFiles([...files, { imageUrl: file, imageId: shortid.generate() + "!" }]);
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        if (!canvasRef.current || !e.target?.result) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = e.target.result as string;
        img.onload = function () {
          const ratio = Math.sqrt(file.size / compSize);
          canvas.width = img.width / ratio;
          canvas.height = img.height / ratio;
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          const dataURL = canvas.toDataURL("image/png");
          const byteString = atob(dataURL.split(",")[1]);
          const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const tmpThumbFile = new Blob([ab], { type: mimeString });
          setFiles([...files, { imageUrl: new File([tmpThumbFile], file.name), imageId: shortid.generate() + "!" }]);
        };
      };
    }
  };

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>사진 업로드</ModalTitle>
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
              <DeleteImageBtn onClick={() => deleteImage(fileObject)}>
                <img src="/icons/delete.svg" alt="delete"></img>
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
      <Canvas ref={canvasRef} />
    </ModalContainer>
  );
};

export default UploadImageModal;

const Canvas = styled.canvas`
  display: none;
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
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 60px;
  box-sizing: border-box;
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

  & > p {
    font-size: 1.6rem;
  }
`;

const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  flex-direction: row;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 2.5rem;
`;
