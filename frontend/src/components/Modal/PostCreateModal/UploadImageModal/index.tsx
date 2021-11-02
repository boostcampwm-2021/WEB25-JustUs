import React, { useRef, useState } from "react";
import styled from "styled-components";
import shortid from "shortid";

interface UploadImageModalProps {
  closeFn: () => void;
}

const UploadImageModal = ({ closeFn }: UploadImageModalProps) => {
  const [images, setImages] = useState<File[]>([]);
  const inputImagaRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGE = 5;

  const clickInputTag = () => {
    if (!inputImagaRef.current || images.length == 5) return;
    inputImagaRef.current.value = "";
    inputImagaRef.current.click();
  };

  const changeImage: React.ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;
    setImages([...images, event.target.files[0]]);
  };

  const nextModal = () => {
    console.log("클릭");
  };

  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        {images.length == 0 ? (
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
          <img src="/icons/add-photo.svg" alt="close" height="50%"></img>
          <ImageInput ref={inputImagaRef} accept="image/*" type="file" onChange={changeImage}></ImageInput>
          <p>
            {images.length}/{MAX_IMAGE}
          </p>
        </UploadButton>
        {images.map(
          image => (
            <ImagePreview key={shortid.generate()}>
              <img src={URL.createObjectURL(image)} alt="close"></img>
            </ImagePreview>
          ),
          "",
        )}
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadImageModal;

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
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  cursor: pointer;
  & img {
    max-width: 100%;
    max-height: 100%;
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
  background-color: #ffffff;
  height: 30vw;
  width: 45vw;
  min-width: 500px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 10vh;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  font-size: max(1.2vw, 20px);
`;

const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  height: 100%;
  box-sizing: border-box;
`;

const UploadButton = styled.div`
  background-color: #dadada;
  border: 1px solid #d7d7d7;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1vw;
  display: flex;
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
