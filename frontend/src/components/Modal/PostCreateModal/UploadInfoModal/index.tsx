import React, { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";
import shortid from "shortid";
import Color from "@styles/Color";

interface FileObject {
  FILE: File;
  KEY: string;
}
interface UploadInfoModalProps {
  closeFn: () => void;
  changeMode: () => void;
  files: FileObject[];
}

const UploadInfoModal = ({ closeFn, changeMode, files }: UploadInfoModalProps) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const showNextImage = () => {
    if (imageIndex == files.length - 1) return;
    setImageIndex(imageIndex + 1);
  };

  const showPrevImage = () => {
    if (imageIndex == 0) return;
    setImageIndex(imageIndex - 1);
  };

  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        <ModalHeaderRigthBtn onClick={closeFn}>
          <img src="/icons/x.svg" alt="close" height="90%"></img>
        </ModalHeaderRigthBtn>
        <ModalHeaderLeftBtn onClick={changeMode}>
          <img src="/icons/prev.svg" alt="prev modal" height="90%"></img>
        </ModalHeaderLeftBtn>
      </ModalHeader>
      <ModalContent>
        <CarouselContainer>
          <Carousel>
            <img onClick={showPrevImage} src="/icons/prev.svg" alt="prev image" height="10%"></img>
            <ImagePreview key={shortid.generate()}>
              <img src={URL.createObjectURL(files[imageIndex].FILE)}></img>
            </ImagePreview>
            <img onClick={showNextImage} src="/icons/next.svg" alt="next image" height="10%"></img>
          </Carousel>
          <div>...</div>
        </CarouselContainer>
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadInfoModal;
const Carousel = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

const CarouselContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImagePreview = styled.div`
  position: relative;
  min-height: 180px;
  width: 100%;
  height: 50%;
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

const ModalHeaderLeftBtn = styled.button`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.white};
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
  min-height: 22px;
  box-sizing: border-box;
  border-bottom: 1px solid ${Color.black};
  font-size: max(1.2vw, 20px);
`;

const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  box-sizing: border-box;
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
