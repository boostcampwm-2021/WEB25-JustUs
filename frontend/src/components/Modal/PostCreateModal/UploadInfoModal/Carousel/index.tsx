import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign, flexColumnCenterAlign, iconHover } from "@styles/StyledComponents";
import { useDispatch } from "react-redux";
import { SpinnerAction } from "@src/action";
import { icon } from "@src/constants";

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
  const dispatch = useDispatch();
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
    carouselRef.current.style.transform = `translate3d(-${carouselWidth * imageIndex}rem, 0, 0)`;
  }, [imageIndex]);

  const loadHandler = (idx: number) => {
    if (idx === 0) dispatch(SpinnerAction.setSpinnerCloseAction());
  };
  const errorHandler = () => {
    dispatch(SpinnerAction.setSpinnerCloseAction());
  };

  return (
    <CarouselContainer carouselWidth={carouselWidth} className="carouselContainer">
      <CaroselImageContainer>
        <ChangeImageButton onClick={showPrevImage} type="button" className="prevBtn">
          <img src={icon.prev} alt="go prev" height="30%"></img>
        </ChangeImageButton>
        <CarouselWindow carouselWidth={carouselWidth}>
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
                  onLoad={() => loadHandler(idx)}
                  onError={errorHandler}
                ></img>
              </div>
            ))}
          </CarouselImage>
        </CarouselWindow>
        <ChangeImageButton onClick={showNextImage} type="button" className="nextBtn">
          <img src={icon.next} alt="go next" height="30%"></img>
        </ChangeImageButton>
      </CaroselImageContainer>
      <DotContainer>
        {files.map((_, idx) => (
          <Dot key={idx} color={imageIndex === idx ? COLOR.BLACK : COLOR.GRAY}></Dot>
        ))}
      </DotContainer>
    </CarouselContainer>
  );
};

export default React.memo(Carousel);
const CarouselContainer = styled.div<{ carouselWidth: number }>`
  ${flexColumnCenterAlign}
`;
const CaroselImageContainer = styled.div`
  width: 100%;
  ${flexRowCenterAlign}
`;
const CarouselWindow = styled.div<{ carouselWidth: number }>`
  overflow: hidden;
  display: flex;
  background-color: ${COLOR.WHITE};
  width: ${(props) => props.carouselWidth}rem;
  height: 80%;
  & * {
    width: 100%;
  }
`;
const CarouselImage = styled.div<{ carouselWidth: number }>`
  transform: translate3d(0, 0, 0);
  transition: transform 0.5s;
  display: flex;
  justify-content: flex-start;
  & > div {
    ${flexRowCenterAlign}
    background-color: ${COLOR.WHITE};
    border: 1rem solid ${COLOR.WHITE};
    min-width: ${(props) => props.carouselWidth - 2}rem;
    max-width: ${(props) => props.carouselWidth}rem;
  }
  & img {
    height: ${(props) => props.carouselWidth}rem;
    object-fit: scale-down;
  }
`;
const ChangeImageButton = styled.button`
  width: 10%;
  ${flexRowCenterAlign}
  border: none;
  display: absolute;
  background: none;
  & > img {
    ${iconHover};
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
