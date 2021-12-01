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
export const modalSlideUp = keyframes`
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
export const smallModalContainer = css`
  background-color: ${COLOR.WHITE};
  display: grid;
  min-height: 30rem;
  min-width: 40rem;
  height: 30rem;
  width: 40rem;
  border-radius: 1rem;
  grid-template-rows: 20% 80%;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  box-sizing: border-box;
  padding: 3rem;
`;
export const smallModalHeader = css`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
export const smallModalTitle = css`
  grid-column-start: 2;
  grid-column-end: 3;
  ${modalTitleFont}
  text-align: center;
  margin: auto;
  align-items: center;
`;
export const smallModalCloseButton = css`
  background-color: ${COLOR.WHITE};
  border: none;
  & > img {
    ${iconHover}
  }
`;
export const smallModalContent = css`
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const mideumGridRow = css`
  display: grid;
  grid-template-rows: 80% 20%;
`;
export const mideumModalContainer = css`
  background-color: ${COLOR.WHITE};
  display: grid;
  min-height: 40rem;
  min-width: 50rem;
  border-radius: 1rem;
  grid-template-rows: 15% 85%;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
  box-sizing: border-box;
  padding: 3rem;
`;
export const mideumModalHeader = css`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
export const mideumModalTitle = css`
  grid-column-start: 2;
  grid-column-end: 3;
  ${modalTitleFont}
  text-align: center;
  margin: auto;
  align-items: center;
`;
export const mideumModalCloseButton = css`
  background-color: ${COLOR.WHITE};
  border: none;
  & > img {
    ${iconHover}
  }
`;
export const mideumModalContent = css`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-column-start: 1;
  grid-column-end: 3;
  box-sizing: border-box;
`;
export const mideumImageSize = css`
  max-width: 13rem;
  max-height: 13rem;
`;
export const mideumImageBackground = css`
  margin: auto;
  width: 13rem;
  height: 13rem;
  ${flexRowCenterAlign}
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  border: 0.5rem solid ${(props) => props.theme.SECONDARY};
  position: relative;
`;
export const mideumDeleteButton = css`
  width: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0.8;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  & img {
    width: 100%;
    height: 100%;
  }
  color: ${COLOR.RED};
`;
export const mideumInputWrapper = css`
  border: none;
  width: 90%;
  height: 2rem;
  margin: auto;
  font-size: 1.6rem;
  border-bottom: 0.2rem solid ${(props) => props.theme.PRIMARY};
  &::-webkit-input-placeholder {
    text-align: center;
    font-size: 1.6rem;
  }
  &:focus {
    outline: none;
  }
`;
export const mideumBottomButton = css`
  border-radius: 1rem;
  margin: auto;
  width: 15rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
  ${flexRowCenterAlign};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.PRIMARY};
  }
`;
export const mideumBottomLeftButton = css`
  border: 0.2rem solid ${COLOR.SHADOW_BLACK};
  color: ${COLOR.SHADOW_BLACK};
  &:hover {
    background-color: ${(props) => props.theme.PRIMARY};
    border: none;
    color: ${COLOR.WHITE};
  }
  ${mideumBottomButton}
`;
export const mideumBottomRightButton = css`
  color: ${COLOR.WHITE};
  background-color: ${(props) => props.theme.SECONDARY};
  ${mideumBottomButton}
`;
