import Toast from "./index";
import styled, { keyframes } from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { FcOk } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { ToastAction } from "@src/action";
import shortid from "shortid";
import { useEffect } from "react";

const Succeed = ({ text }: { text: string }) => {
  const dispatch = useDispatch();
  const key = shortid.generate();
  const toastEl = document.getElementById("toast-message") as HTMLElement;

  const setDisplayNone = () => {
    toastEl.style.display = "none";
  };

  const onClickCloseBtn = () => {
    dispatch(ToastAction.clearToastAction());
    setDisplayNone();
  };

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setDisplayNone();
      }, 5000);
    };
  }, []);

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
    z-index: 8;
  }
  50% {
    transform: translateY(-10rem);
    visibility: visible;
    z-index: 8;
  }
  100% {
    transform: translateY(10rem);
    z-index: 8;
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
