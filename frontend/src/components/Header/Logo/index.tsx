import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";
const Logo = () => {
  return (
    <LogoContainer>
      <TextLogo href={"/"}>
        <div>우</div>
        <div>리</div>
        <div>끼</div>
        <div>리</div>
        <div></div>
      </TextLogo>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  ${flexRowCenterAlign}
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const flipper = keyframes`
from{transform: rotateX(90deg);}
to{transform: rotateX(0deg);}`;

const fadeIn = keyframes`
from{opacity:0};
to{opacity:1};`;

const TextLogo = styled.a`
  font-size: 2.1rem;
  color: ${COLOR.WHITE};
  margin-left: 2rem;
  & div {
    display: inline-block;
    width: 2.1rem;
    height: 2.1rem;
    &:nth-child(1) {
      animation: ${flipper} 1s cubic-bezier(0.68, -0.55, 0.26, 1.55) both, ${fadeIn} 1s both;
    }
    &:nth-child(2) {
      animation: ${flipper} 1s cubic-bezier(0.68, -0.55, 0.26, 1.55) 0.2s both, ${fadeIn} 1s both;
    }
    &:nth-child(3) {
      animation: ${flipper} 1s cubic-bezier(0.68, -0.55, 0.26, 1.55) 0.4s both, ${fadeIn} 1s both;
    }
    &:nth-child(4) {
      animation: ${flipper} 1s cubic-bezier(0.68, -0.55, 0.26, 1.55) 0.6s both, ${fadeIn} 1s both;
    }
    &:nth-child(5) {
      background-image: url("/icons/podo-many.png");
      background-size: 2.1rem;
      background-repeat: no-repeat;
      animation: ${flipper} 1s cubic-bezier(0.68, -0.55, 0.26, 1.55) 0.8s both, ${fadeIn} 1s both;
    }
  }
`;
