import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";

interface FileObject {
  file: File;
  key: string;
}
interface UploadInfoModalProps {
  changeMode: () => void;
  files: FileObject[];
}

const UploadInfoModal = ({ changeMode, files }: UploadInfoModalProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const showNextImage = () => {
    if (imageIndex == files.length - 1 || !carouselRef.current) return;
    setImageIndex(imageIndex + 1);
  };

  const showPrevImage = () => {
    if (imageIndex == 0 || !carouselRef.current) return;
    setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transform = `translate3d(-${carouselRef.current.offsetWidth * imageIndex}px, 0, 0)`;
  }, [imageIndex]);

  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        <ModalHeaderRigthBtn onClick={closeModal}>
          <img src="/icons/x.svg" alt="close" height="90%"></img>
        </ModalHeaderRigthBtn>
        <ModalHeaderLeftBtn onClick={changeMode}>
          <img src="/icons/prev.svg" alt="prev modal" height="90%"></img>
        </ModalHeaderLeftBtn>
      </ModalHeader>
      <ModalContent>
        <ModalLeft>
          <ChangeImageButton onClick={showPrevImage} type="button">
            <img src="/icons/prev.svg" alt="prev image" height="30%"></img>
          </ChangeImageButton>
          <CarouselWindow>
            <Carousel ref={carouselRef}>
              {files.map(fileObject => (
                <img src={URL.createObjectURL(fileObject.file)}></img>
              ))}
            </Carousel>
            <DotContainer>
              {files.map((fileObject, idx) => (
                <Dot color={imageIndex == idx ? COLOR.BLACK : COLOR.GRAY}></Dot>
              ))}
            </DotContainer>
          </CarouselWindow>
          <ChangeImageButton onClick={showNextImage} type="button">
            <img src="/icons/next.svg" alt="next image" height="30%"></img>
          </ChangeImageButton>
        </ModalLeft>
        <div></div>
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadInfoModal;
const DotContainer = styled.div`
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
`;
const Dot = styled.div`
  width: 5px;
  height: 5px;
  margin: 5px;
  border-radius: 50px;
  background-color: ${props => props.color}; ;
`;

const CarouselWindow = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-rows: 1fr 60px;
  overflow: hidden;
  height: 100%;
`;
const ChangeImageButton = styled.button`
  z-index: 2;
  height: 20%;
  border: none;
  background: none;
  cursor: pointer;
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
  transition: transform 0.5s;
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
  background-color: ${COLOR.WHITE};
  width: 850px;
  height: 530px;
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
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.BLACK};
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
