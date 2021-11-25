import { css, keyframes } from "styled-components";
import COLOR from "@styles/Color";

export const flexRowCenterAlign = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColumnCenterAlign = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const modalContainerWidth = css`
  min-width: 720px;
`;
export const modalContainerHeight = css`
  height: 60%;
  min-height: 460px;
`;
export const modalContainerSize = css`
  ${modalContainerHeight}
  ${modalContainerWidth}
  border-radius: 1rem;
`;
export const shadow = css`
  box-shadow: 0 0 3px 0 ${COLOR.SHADOW_BLACK};
`;
export const postCardShadow = css`
  box-shadow: 5px 2px 3px 3px ${COLOR.SHADOW_BLACK};
`;
export const iconHover = css`
  &:hover {
    cursor: pointer;
    background-color: ${COLOR.GRAY};
    border-radius: 50%;
  }
`;
export const modalIconSize = css``;
export const modalWidth = css`
  min-width: 720px;
  z-index: 6;
`;
export const modalHeaderWithTwoIcon = css``;

export const modalHeaderWithOneIcon = css`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  box-sizing: border-box;
  position: relative;
`;
export const modalTitleFont = css`
  font-size: 2.5rem;
  font-weight: bold;
`;
const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
`;
export const modalSlideUpAnimation = css`
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;
export const modalHeaderButtonIcon = css`
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;
export const scrollbar = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.SECONDARY};
    border-radius: 1rem;
  }
`;
export const scrollbarPrimary = css`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.PRIMARY};
    border-radius: 1rem;
  }
`;
