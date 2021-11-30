import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { icon } from "@src/constants";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const spinnerRootEl = document.getElementById("spinner");
if (spinnerRootEl) {
  spinnerRootEl.style.display = "flex";
  spinnerRootEl.style.flexDirection = "row";
  spinnerRootEl.style.justifyItems = "center";
  spinnerRootEl.style.alignItems = "center";
  spinnerRootEl.style.position = "absolute";
  spinnerRootEl.style.top = "0px";
  spinnerRootEl.style.left = "0px";
  spinnerRootEl.style.width = "100%";
  spinnerRootEl.style.height = "100%";
}

const pop = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const BackGround = styled.div`
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

const Animaion = (
  <BackGround>
    <img width="40" src={icon.podo} alt="clear icon" />
    <img width="40" src={icon.podoThree} alt="clear icon" />
    <img width="40" src={icon.podoMany} alt="clear icon" />
  </BackGround>
);

const Spinner = () => {
  const { userInfoSucceed } = useSelector((state: RootState) => state.user);
  const { spinnerActivate }: any = useSelector((state: RootState) => state.spinner);
  const { groupListLoaded }: any = useSelector((state: RootState) => state.groups);
  if (!spinnerRootEl) return null;

  if (!userInfoSucceed || spinnerActivate || !groupListLoaded) {
    spinnerRootEl.style.zIndex = "20";
    spinnerRootEl.style.display = "flex";
    return ReactDOM.createPortal(Animaion, spinnerRootEl);
  }
  spinnerRootEl.style.zIndex = "1";
  spinnerRootEl.style.display = "none";
  return <div />;
};

export default Spinner;
