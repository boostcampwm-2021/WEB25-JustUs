import Toast from "./index";
import styled, { keyframes } from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { FcHighPriority } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { ToastAction } from "@src/action";
import shortid from "shortid";
import { useEffect } from "react";
import { icon } from "@src/constants";

const Error = ({ text }: { text: string }) => {
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
      }, 3000);
    };
  }, []);

  return (
    <Toast>
      <ToastWrapper id="toast" key={key}>
        <Content>
          <IconWrapper>
            <FcHighPriority size="30" />
          </IconWrapper>
          <Text>{text}</Text>
          <CloseBtn onClick={onClickCloseBtn}>
            <img src={icon.clear} alt="clear icon" />
          </CloseBtn>
        </Content>
      </ToastWrapper>
    </Toast>
  );
};

const shake = keyframes`
  0% {
    transform: translateY(-15rem);
    z-index: 8;
    visibility: visible;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.5);
  }
  5%, 10%, 15%, 20% {
    transform: translate(-2px, -15rem);
  }
  2.5%, 7.5%, 12.5% {
    transform: translate(2px, -15rem);
  }
  17.5%, 25% {
    transform: translate(0, -15rem);
  }
  100% {
    transform: translateY(15rem);
  }
`;

const ToastWrapper = styled.div`
  position: relative;
  width: 40rem;
  height: 10rem;
  bottom: -10rem;
  border-radius: 10px;
  animation-name: ${shake};
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
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
  font-weight: bold;
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

export default Error;
