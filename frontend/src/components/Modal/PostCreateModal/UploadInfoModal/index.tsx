import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";

interface FileObject {
  file: File;
  key: string;
}
interface UploadInfoModalProps {
  changeMode: () => void;
  files: FileObject[];
}

const UploadInfoModal = ({ changeMode, files }: UploadInfoModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [activate, setActivate] = useState<boolean>(false);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handelTitleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    setTitle(value);
  };

  const handelTextInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    setText(value);
  };

  useEffect(() => {
    if (title.length == 0) setActivate(false);
    else setActivate(true);
  }, [title]);

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
    >
      <ModalHeader>
        <ModalTitle>새 게시물 만들기</ModalTitle>
        <ModalHeaderRigthBtn onClick={closeModal}>
          <img src="/icons/x.svg" alt="close" height="90%"></img>
        </ModalHeaderRigthBtn>
        <ModalHeaderLeftBtn onClick={changeMode}>
          <img src="/icons/prev.svg" alt="prev modal" height="90%"></img>
        </ModalHeaderLeftBtn>
      </ModalHeader>
      <ModalContent>
        <ModalLeft>
          <Carousel files={files} carouselWidth={250} />
        </ModalLeft>
        <ModalRight>
          <InputTitle type="text" placeholder="제목" value={title} onChange={handelTitleInput} />
          <InputText placeholder="내용" value={text} onChange={handelTextInput} />
          <InputBottom>
            <InputDate type="date" />
            <InputPlace>
              <InputPlaceName>장소이름</InputPlaceName>
              <LocationButton>
                <img src="/icons/location.svg" width="100%" />
              </LocationButton>
            </InputPlace>
          </InputBottom>
          <UploadButton activate={activate}>게시하기</UploadButton>
        </ModalRight>
      </ModalContent>
    </ModalContainer>
  );
};

export default UploadInfoModal;
const UploadButton = styled.button<{ activate: boolean }>`
  background-color: ${(props) => {
    if (props.activate) return COLOR.THEME1.PRIMARY;
    else return COLOR.THEME1.SECONDARY;
  }};
  border: 1px solid ${COLOR.THEME1.PRIMARY};
  border-radius: 10px;
  flex-basis: 3rem;
  margin-top: 1rem;
  color: ${COLOR.WHITE};
  font-size: 1rem;
  cursor: ${(props) => {
    if (props.activate) return "pointer";
    else return "not-allowed";
  }};
`;
const LocationButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const InputPlaceName = styled.div`
  border: 1px solid black;
  height: 4vh;
  line-height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  margin-right: 30px;
  flex-basis: 90%;
  text-align: right;
`;
const InputBottom = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 5rem;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${COLOR.LIGHTGRAY1};
  padding-right: 2rem;
`;
const InputPlace = styled.div`
  display: flex;
  width: 100%;
`;
const InputDate = styled.input`
  flex-basis: 20vh;
  border: none;
  font-size: 1rem;
  padding-right: 5px;
`;
const InputTitle = styled.input`
  flex-basis: 5vh;
  margin-bottom: 2vh;
  border: none;
  border-bottom: 1px solid ${COLOR.LIGHTGRAY1};
  font-size: 1.2rem;
  &:focus {
    outline: none;
  }
`;
const InputText = styled.textarea`
  flex-basis: 60%;
  font-size: 1.2rem;
  border: none;
  resize: none;
  margin-bottom: 2vh;
  &:focus {
    outline: none;
  }
`;
const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh;
  padding-top: 2vh;
  padding-bottom: 5vh;
`;

const ModalLeft = styled.div`
  width: 100%;
  height: 100%;
`;

const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${COLOR.WHITE};
  width: 850px;
  height: 530px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
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

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  padding: 1vw;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.BLACK};
  font-size: max(1.2vw, 20px);
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
