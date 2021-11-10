import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";

interface FileObject {
  file: File | string;
  key: string;
}
interface CarouselProps {
  files: FileObject[];
  carouselWidth: number;
}

const Carousel = ({ files, carouselWidth }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
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
    carouselRef.current.style.transform = `translate3d(-${carouselWidth * imageIndex}px, 0, 0)`;
  }, [imageIndex]);

  return (
    <CarouselContainer carouselWidth={carouselWidth}>
      <ChangeImageButton onClick={showPrevImage} type="button">
        <img src="/icons/prev.svg" alt="prev image" height="30%"></img>
      </ChangeImageButton>
      <CarouselWindow>
        <CarouselImage ref={carouselRef} carouselWidth={carouselWidth}>
          {files.map((fileObject, idx) => (
            <div key={idx}>
              <img
                src={typeof fileObject.file === "string" ? fileObject.file : URL.createObjectURL(fileObject.file)}
              ></img>
            </div>
          ))}
        </CarouselImage>
      </CarouselWindow>
      <ChangeImageButton onClick={showNextImage} type="button">
        <img src="/icons/next.svg" alt="next image" height="30%"></img>
      </ChangeImageButton>
      <DotContainer>
        {files.map((fileObject, idx) => (
          <Dot key={idx} color={imageIndex == idx ? COLOR.BLACK : COLOR.GRAY}></Dot>
        ))}
      </DotContainer>
    </CarouselContainer>
  );
};

export default Carousel;
const CarouselContainer = styled.div<{ carouselWidth: number }>`
  padding: 10px;
  display: grid;
  height: 100%;
  grid-template-columns: 1fr ${(props) => props.carouselWidth}px 1fr;
  grid-template-rows: 80% 20%;
  align-items: center;
  justify-content: center;
`;

const CarouselImage = styled.div<{ carouselWidth: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
  transition: transform 0.5s;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => props.carouselWidth}px;
  }
  & img {
    max-width: 100%;
    object-fit: contain;
  }
`;

const CarouselWindow = styled.div`
  display: grid;
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

const DotContainer = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
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
  background-color: ${(props) => props.color}; ;
`;
