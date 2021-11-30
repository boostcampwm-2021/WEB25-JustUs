import { icon } from "@src/constants";
import styled from "styled-components";

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <ImageWrapper>
        <Guide>잘못된 페이지에요 ㅠㅠ</Guide>
      </ImageWrapper>
    </NotFoundWrapper>
  );
};

const NotFoundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: center;
  background-image: url(${icon.cryingPodo});
  background-size: 40%;
  background-repeat: no-repeat;
  width: 100%;
  height: 95vh;
`;
const Guide = styled.div`
  font-size: 5rem;
  margin-bottom: 1vh;
`;

export default NotFound;
