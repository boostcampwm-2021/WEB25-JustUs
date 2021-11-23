import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign, flexColumnCenterAlign } from "@styles/StyledComponents";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface CarouselProps {
  files: FileObject[];
  carouselWidth: number;
}

const Carousel = ({ files, carouselWidth }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const showNextImage = () => {
    if (imageIndex === files.length - 1 || !carouselRef.current) return;
    setImageIndex(imageIndex + 1);
  };

  const showPrevImage = () => {
    if (imageIndex === 0 || !carouselRef.current) return;
    setImageIndex(imageIndex - 1);
  };

  useEffect(() => {
    if (!carouselRef.current) return;
    carouselRef.current.style.transform = `translate3d(-${carouselWidth * imageIndex}px, 0, 0)`;
  }, [imageIndex]);

  return (
    <CarouselContainer carouselWidth={carouselWidth} className="carouselContainer">
      <CarouselWindow>
        <ChangeImageButton onClick={showPrevImage} type="button" className="prevBtn">
          <img src="/icons/prev.svg" alt="go prev" height="30%"></img>
        </ChangeImageButton>
        <CarouselImage className="carouselImage" ref={carouselRef} carouselWidth={carouselWidth}>
          {files.map((fileObject, idx) => (
            <div key={idx}>
              <img
                alt={String(fileObject)}
                src={
                  typeof fileObject.imageUrl === "string"
                    ? fileObject.imageUrl
                    : URL.createObjectURL(fileObject.imageUrl)
                }
              ></img>
            </div>
          ))}
        </CarouselImage>
        <ChangeImageButton onClick={showNextImage} type="button" className="nextBtn">
          <img src="/icons/next.svg" alt="go next" height="30%"></img>
        </ChangeImageButton>
      </CarouselWindow>
      <DotContainer>
        {files.map((_, idx) => (
          <Dot key={idx} color={imageIndex === idx ? COLOR.BLACK : COLOR.GRAY}></Dot>
        ))}
      </DotContainer>
    </CarouselContainer>
  );
};

export default Carousel;
const CarouselContainer = styled.div<{ carouselWidth: number }>`
  display: grid;
  width: 100%;
  height: 100%;
  ${flexColumnCenterAlign}
`;
const CarouselWindow = styled.div`
  ${flexRowCenterAlign}
  width: 100%;
  & * {
    width: 100%;
  }
`;
const ChangeImageButton = styled.button`
  width: 10%;
  border: none;
  display: absolute;
  background: none;
  & > img {
    cursor: pointer;
  }
`;
const CarouselImage = styled.div<{ carouselWidth: number }>`
  ${flexRowCenterAlign}
  transform: translate3d(0, 0, 0);
  transition: transform 0.5s;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  & img {
    width: 80%;
    object-fit: scale-down;
  }
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
