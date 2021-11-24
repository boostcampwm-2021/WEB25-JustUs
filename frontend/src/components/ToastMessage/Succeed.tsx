import Toast from "./index";
import styled, { keyframes } from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { FcOk } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { CLEAR_TOAST } from "@src/reducer/ToastReducer";
import shortid from "shortid";

const Succeed = ({ text }: { text: string }) => {
  const dispatch = useDispatch();
  const key = shortid.generate();

  const onClickCloseBtn = () => {
    dispatch({ type: CLEAR_TOAST });
  };

  return (
    <Toast>
      <ToastWrapper id="toast" key={key}>
        <Content>
          <IconWrapper>
            <FcOk size="30" />
          </IconWrapper>
          <Text>{text}</Text>
          <CloseBtn onClick={onClickCloseBtn}>
            <img src="/icons/clear.svg" alt="clear icon" />
          </CloseBtn>
        </Content>
        <Footer />
      </ToastWrapper>
    </Toast>
  );
};

const up = keyframes`
  0% {
    z-index: 6;
  }
  50% {
    transform: translateY(-10rem);
    visibility: visible;
    z-index: 6;
  }
  100% {
    transform: translateY(10rem);
    z-index: 6;
  }
`;
const progress = ({ theme }: { theme: { PRIMARY: string; SECONDARY: string; MENUTEXT: string } }) => keyframes`
  0% {
    width: 100%;
    background-color: ${theme.PRIMARY};
  }
  100% {
    width: 0;
    background-color: ${theme.PRIMARY};
  }
`;

const ToastWrapper = styled.div`
  position: relative;
  width: 40rem;
  height: 10rem;
  bottom: -5rem;
  border-radius: 10px;
  animation-name: ${up};
  animation-duration: 5s;
  animation-timing-function: ease-out;
  visibility: hidden;
  background-color: ${COLOR.WHITE};
  z-index: 10;
`;
const Content = styled.div`
  height: 90%;
  display: grid;
  grid-template-columns: 20% 70% 10%;
`;
const IconWrapper = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  ${flexRowCenterAlign}
`;
const Text = styled.div`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  grid-column-start: 2;
  grid-column-end: 3;
`;
const CloseBtn = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 3;
  grid-column-end: 4;
  cursor: pointer;
`;
const Footer = styled.div`
  width: 100%;
  height: 10%;
  background-color: ${COLOR.WHITE};
  animation-name: ${(props) => progress(props)};
  animation-duration: 2.5s;
  animation-timing-function: linear;
`;

export default Succeed;
