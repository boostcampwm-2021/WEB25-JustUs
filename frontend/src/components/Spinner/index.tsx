import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";
const Spinner = () => {
  return (
    <BackGround>
      <img width="40" src="/icons/podo.png" alt="clear icon" />
      <img width="40" src="/icons/podo-three.png" alt="clear icon" />
      <img width="40" src="/icons/podo-many.png" alt="clear icon" />
    </BackGround>
  );
};

export default Spinner;
const pop = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }

}`;

const BackGround = styled.div`
  position: absolute;
  ${flexRowCenterAlign}
  width: 100%;
  height: 100%;
  z-index: 20;

  & img {
    margin: 2rem;
  }
  & img:nth-child(1) {
    animation: ${pop} 1.2s -0.32s linear infinite;
  }
  & img:nth-child(2) {
    animation: ${pop} 1.2s -0.16s linear infinite;
  }
  & img:nth-child(3) {
    animation: ${pop} 1.2s 0s linear infinite;
  }
`;
