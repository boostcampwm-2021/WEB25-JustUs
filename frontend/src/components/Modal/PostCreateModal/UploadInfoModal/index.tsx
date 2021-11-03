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
  const carouselRef = useRef<HTMLDivElement>(null);
  let imageIndex = 0;

  const showNextImage = () => {
    if (imageIndex == files.length - 1 || !carouselRef.current) return;
    console.log(">");
    imageIndex++;
    carouselRef.current.style.transform = `translate3d(-${200 * imageIndex}px, 0, 0)`;
  };

  const showPrevImage = () => {
    if (imageIndex == 0 || !carouselRef.current) return;
    console.log("<");
    imageIndex--;
    carouselRef.current.style.transform = `translate3d(-${200 * imageIndex}px, 0, 0)`;
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
        <ModalLeft>
          <ChangeImageButton onClick={showPrevImage} type="button">
            prev
          </ChangeImageButton>
          <CarouselWindow>
            <Carousel ref={carouselRef}>
              {files.map(fileObject => (
                <img src={URL.createObjectURL(fileObject.FILE)}></img>
              ))}
            </Carousel>
          </CarouselWindow>
          <ChangeImageButton onClick={showNextImage} type="button">
            next
          </ChangeImageButton>
        </ModalLeft>
        <div></div>
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadInfoModal;
const CarouselWindow = styled.div`
  overflow: hidden;
`;
const ChangeImageButton = styled.button`
  z-index: 2;
  height: 20%;
`;

const ModalLeft = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 1fr;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;
const Carousel = styled.div`
  display: flex;
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s;
  & img {
    max-width: 100%;
    object-fit: contain;
  }
`;

const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.white};
  height: 30vw;
  width: 45vw;
  min-width: 600px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
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

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  min-height: 22px;
  box-sizing: border-box;
  border-bottom: 1px solid ${Color.black};
  font-size: max(1.2vw, 20px);
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
