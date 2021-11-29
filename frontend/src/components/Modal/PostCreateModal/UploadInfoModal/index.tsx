import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import { RootState } from "@src/reducer";
import { ToastAction, ModalAction, GroupAction } from "@src/action";
import ModalSub from "./ModalSub";
import {
  flexRowCenterAlign,
  flexColumnCenterAlign,
  modalTitleFont,
  modalSlideUpAnimation,
  modalHeaderButtonIcon,
  scrollbar,
  iconHover,
} from "@styles/StyledComponents";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface IData {
  [key: string]: string;
}

interface ILocation {
  placeName: string;
  x: number;
  y: number;
}
interface UploadInfoModalProps {
  mode: string;
  changeMode: () => void;
  files: FileObject[];
  prevTitle: string | "";
  prevText: string | "";
  prevDate: string | "";
  prevLocation: ILocation;
}

interface IselectedPost {
  userId: number;
  userNickname: string;
  postId: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  images: Array<{ imageUrl: string; imageId: string }>;
  postLatitude: number;
  postLongitude: number;
}

const exportDateTime = (date: string) => {
  const dateStart = 0;
  const dateEnd = 10;
  return date.substring(dateStart, dateEnd);
};

const UploadInfoModal = ({
  mode,
  changeMode,
  files,
  prevTitle,
  prevText,
  prevDate,
  prevLocation,
}: UploadInfoModalProps) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>(prevTitle);
  const [text, setText] = useState<string>(prevText);
  const [activate, setActivate] = useState<boolean>(false);
  const [isSubOpened, setIsSubOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IData[]>([]);
  const [date, setDate] = useState<string>(exportDateTime(prevDate));
  const [selectedLocation, setSelectedLocation] = useState<ILocation>(prevLocation);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [gobackClicked, setGobackClicked] = useState<boolean>(false);
  const highlightsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { address }: any = useSelector((state: RootState) => state.address);
  const { selectedPost }: { selectedPost: IselectedPost } = useSelector((state: RootState) => state.modal);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    handelTextInput(null);
  }, []);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const handelTitleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    setTitle(value);
  };

  const handelTextInput = (event: React.FormEvent<HTMLTextAreaElement> | null) => {
    const value = event ? (event.target as HTMLTextAreaElement).value : text;
    const highlightedText = applyHighlights(value);
    setText(value);
    highlightsRef.current.innerHTML = highlightedText;
  };

  const applyHighlights = (textParam: string) => {
    const highlightedText = textParam.replace(/#([\w|ㄱ-ㅎ|가-힣]+)/g, "<mark>$&</mark>").replace(/\n/g, "<br>");
    const addDiv = highlightedText && highlightedText.match(/\<br\>$/gm) ? `<div class="new-line"></div>` : ``;
    return highlightedText + addDiv;
  };

  const handleScroll = () => {
    const scrollTop = inputRef.current?.scrollTop as number;

    if (!backdropRef.current) return;
    highlightsRef.current.scrollTop = scrollTop;
    backdropRef.current.scrollTop = scrollTop;
  };

  const onClickLocationBtn = () => {
    setIsSubOpened((prev) => !prev);
  };

  const handleSaveBtn = () => {
    if (mode === "create") {
      const post = {
        postTitle: title,
        postContent: text,
        postDate: date,
        postLocation: selectedLocation.placeName,
        postLatitude: Number(selectedLocation.y),
        postLongitude: Number(selectedLocation.x),
        groupId: selectedGroup.groupId,
        postImage: files,
      };

      dispatch(GroupAction.uploadPostRequestAction(post));
    } else if (mode === "update") {
      const newFileList = files.filter((file) => typeof file.imageUrl !== "string");
      const oldFileList = files.filter((file) => typeof file.imageUrl === "string").map((item) => item.imageId);
      const deleteFileList = selectedPost.images
        .filter((image) => !oldFileList.includes(image.imageId))
        .map((item) => item.imageId);

      const updatePost = {
        postId: selectedPost.postId,
        postTitle: title,
        postContent: text,
        postDate: date,
        postLocation: selectedLocation.placeName,
        postLatitude: Number(selectedLocation.y),
        postLongitude: Number(selectedLocation.x),
        addImages: newFileList,
        deleteImagesId: deleteFileList,
        groupId: selectedGroup.groupId,
      };

      dispatch(GroupAction.updatePostRequestAction(updatePost));
    }

    closeModal();
  };

  const showToast = () => {
    if (!title.length) {
      dispatch(ToastAction.setErrorToastAction({ text: "제목을 입력해 주세요." }));
    } else if (!date.length) {
      dispatch(ToastAction.setErrorToastAction({ text: "날짜를 선택해 주세요." }));
    } else if (selectedLocation.y === -1) {
      dispatch(ToastAction.setErrorToastAction({ text: "장소를 입력해 주세요." }));
    }
  };

  useEffect(() => {
    if (!title.length || !date.length || selectedLocation.y === -1) setActivate(false);
    else setActivate(true);
  }, [title, date, selectedLocation]);

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
      isSubOpened={isSubOpened}
      className="modalContainer"
    >
      <ModalMain isSubOpened={isSubOpened} className="modalMain">
        <ModalHeader className="modalHeader">
          <ModalTitle>{mode === "create" ? "새 게시물 만들기" : "게시물 수정"}</ModalTitle>
          <ModalHeaderLeftBtn onClick={changeMode}>
            <img src="/icons/prev.svg" alt="prev modal"></img>
          </ModalHeaderLeftBtn>
          <ModalHeaderRigthBtn onClick={closeModal}>
            <img src="/icons/x.svg" alt="close"></img>
          </ModalHeaderRigthBtn>
        </ModalHeader>
        <ModalContent className="modalContent">
          <ModalLeft className="modalLeft">
            <Carousel files={files} carouselWidth={30} />
          </ModalLeft>
          <ModalRight className="modalRight">
            <InputTitle type="text" placeholder="제목" value={title} onChange={handelTitleInput} />
            <ContentWrap className="contentWrap">
              <BackDrop className="backdrop" ref={backdropRef}>
                <HighLights ref={highlightsRef} className="highlights"></HighLights>
              </BackDrop>
              <InputText
                ref={inputRef}
                placeholder="내용"
                value={text}
                spellCheck={false}
                onChange={handelTextInput}
                onScroll={handleScroll}
              />
            </ContentWrap>
            <InputBottom className="inputBottom">
              <InputDate
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
              <InputPlace onClick={address === "" ? onClickLocationBtn : () => null}>
                {address === "" ? (
                  <InputPlaceName>
                    {selectedLocation.placeName === "" ? "장소를 선택하세요." : selectedLocation.placeName}
                  </InputPlaceName>
                ) : (
                  <InputPlaceName>{address}</InputPlaceName>
                )}
                <LocationButton>
                  <img src="/icons/location.svg" alt="location" width="100%" />
                </LocationButton>
              </InputPlace>
            </InputBottom>
            <UploadButton activate={activate} onClick={activate ? handleSaveBtn : showToast}>
              {mode === "create" ? "게시하기" : "수정하기"}
            </UploadButton>
          </ModalRight>
        </ModalContent>
      </ModalMain>
      <ModalSub
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        isSubOpened={isSubOpened}
        setIsSubOpened={setIsSubOpened}
        setSelectedLocation={setSelectedLocation}
        searchResult={searchResult}
        setSearchResult={setSearchResult}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
        setLastPage={setLastPage}
        gobackClicked={gobackClicked}
        setGobackClicked={setGobackClicked}
      />
    </ModalContainer>
  );
};

const contentOverflow = css`
  word-break: normal;
  overflow-wrap: break-word;
`;
const contentWhiteSpace = css`
  white-space: pre-wrap;
`;
const contentFont = css`
  font-size: 1.6rem;
  line-height: 2rem;
`;
const contentSize = css`
  height: 20rem;
  width: 100%;
`;
const headerBtn = css`
  ${flexRowCenterAlign}
  border: none;
  background: none;
  & > img {
    ${modalHeaderButtonIcon}
  }
`;
const ModalContainer = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  height: 60%;
  min-height: 460px;
  border-radius: 1rem;
  box-shadow: 0 2px 3px 0 ${COLOR.SHADOW_BLACK};
  ${modalSlideUpAnimation}

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalMain = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: 720px;
  height: 100%;
  z-index: 6;
  display: grid;
  grid-template-rows: 10% 90%;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  box-sizing: border-box;
  position: relative;
`;
const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  ${modalTitleFont}
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
`;
const ModalHeaderLeftBtn = styled.button`
  ${headerBtn}
  ${flexColumnCenterAlign}
  & > img {
    ${iconHover};
  }
`;
const ModalHeaderRigthBtn = styled.button`
  ${headerBtn};
  & > img {
    ${iconHover};
  }
`;
const ModalContent = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
  margin: 0 2rem 2rem 1rem;
  height: 100%;
`;
const ModalLeft = styled.div`
  position: relative;
  width: 100%;
  height: 90%;
  min-width: 300px;
  margin-right: 2rem;
  ${flexRowCenterAlign}
`;
const ModalRight = styled.div`
  position: relative;
  display: grid;
  height: 90%;
  margin-left: 2rem;
  grid-template-rows: 15% 45% 25% 15%;
  & mark {
    ${contentOverflow}
    ${contentWhiteSpace}
    ${contentFont}
    display: inline;
    background-color: ${COLOR.THEME1.SECONDARY};
  }
  & .new-line {
    height: 2rem;
  }
  & > * {
    margin-top: 1rem;
    &:first-child {
      margin: 0;
    }
  }
`;
const InputTitle = styled.input`
  flex-basis: 5vh;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${COLOR.LIGHTGRAY1};
  font-size: 1.6rem;
  &:focus {
    outline: none;
  }
`;
const ContentWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const BackDrop = styled.div`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  ${scrollbar}
  height: 100%;
  position: absolute;
`;
const HighLights = styled.div`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  position: absolute;
  overflow-y: scroll;
  height: 100%;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const InputText = styled.textarea`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  height: 100%;
  resize: none;
  position: relative;
  ${scrollbar}
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const InputBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  border-top: 1px solid ${COLOR.LIGHTGRAY1};
  & > input[type="date"] {
    font-family: "NanumGothic", sans-serif;
    overflow: hidden;
    padding: 0;
  }
`;
const InputDate = styled.input`
  border: none;
  font-size: 1.6rem;
  z-index: 3;
`;
const InputPlace = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  z-index: 3;
  cursor: pointer;
`;
const InputPlaceName = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 1px solid black;
  height: 100%;
  line-height: 4vh;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border: none;
  margin-right: 3rem;
  flex-basis: 90%;
  text-align: right;
  color: ${COLOR.DARKGRAY};
  font-size: 1.6rem;
`;

const LocationButton = styled.button`
  border: none;
  background: none;
  width: 3.4rem;
  & > img {
    ${flexRowCenterAlign}
    ${iconHover}
  }
`;
const UploadButton = styled.button<{ activate: boolean }>`
  background-color: ${(props) => {
    if (props.activate) return props.theme.PRIMARY;
    else return "transparent";
  }};
  border: ${(props) => {
    if (props.activate) return "none";
    else return `1px solid ${props.theme.SECONDARY}`;
  }};
  border-radius: 1rem;
  flex-basis: 3rem;
  color: ${(props) => {
    if (props.activate) return COLOR.WHITE;
    else return "none";
  }};
  font-size: 1.6rem;
  cursor: pointer;
`;

export default UploadInfoModal;
