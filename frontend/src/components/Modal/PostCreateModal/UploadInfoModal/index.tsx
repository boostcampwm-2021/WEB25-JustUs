import React, { MouseEvent, useRef, useState } from "react";
import styled from "styled-components";
import shortid from "shortid";
import Color from "@styles/Color";

interface FileObject {
  File: File;
  Key: string;
}
interface UploadInfoModalProps {
  closeFn: () => void;
  changeMode: () => void;
  files: FileObject[];
}

const UploadInfoModal = ({ closeFn, changeMode, files }: UploadInfoModalProps) => {
  return (
    <ModalContainer
      onClick={event => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        <ModalHeaderRigthBtn onClick={closeFn}>
          <img src="/icons/x.svg" alt="close" height="90%"></img>
        </ModalHeaderRigthBtn>
        <ModalHeaderLeftBtn onClick={changeMode}>
          <img src="/icons/prev.svg" alt="close" height="90%"></img>
        </ModalHeaderLeftBtn>
      </ModalHeader>
      <ModalContent>
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadInfoModal;

const ImagePreview = styled.div`
  border: 1px solid ${Color.gray};
  box-sizing: border-box;
  border-radius: 8px;
  margin: 1vw;
  vertical-align: middle;
  text-align: center;
  position: relative;
  min-height: 150px;
  & img {
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ModalHeaderLeftBtn = styled.button`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;

const ModalHeaderRigthBtn = styled.button`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 2;
  border: none;
  background: none;
  cursor: pointer;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.white};
  height: 30vw;
  width: 45vw;
  min-width: 500px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 4vw;
  box-sizing: border-box;
  border-bottom: 1px solid ${Color.black};
  font-size: max(1.2vw, 20px);
`;

const ModalContent = styled.div`
  display: grid;
  height: 26vw;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  box-sizing: border-box;
`;

const ModalTitle = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
