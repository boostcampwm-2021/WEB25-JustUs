import React, { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import { RootState } from "@src/reducer";
import ModalSub from "./ModalSub";
import { flexRowCenterAlign, flexColumnCenterAlign } from "@styles/StyledComponents";

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
    dispatch({ type: "CLOSE_MODAL" });
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
    setIsSubOpened(true);
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

      dispatch({ type: "UPLOAD_POST_REQUEST", post });
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

      dispatch({ type: "UPDATE_POST_REQUEST", post: updatePost });
    }

    closeModal();
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
          <ModalHeaderRigthBtn onClick={closeModal}>
            <img src="/icons/x.svg" alt="close"></img>
          </ModalHeaderRigthBtn>
          <ModalHeaderLeftBtn onClick={changeMode}>
            <img src="/icons/prev.svg" alt="prev modal"></img>
          </ModalHeaderLeftBtn>
        </ModalHeader>
        <ModalContent>
          <ModalLeft className="modalLeft">
            <Carousel files={files} carouselWidth={250} />
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
              <InputPlace>
                {address === "" ? (
                  <InputPlaceName>
                    {selectedLocation.placeName === "" ? "장소를 선택하세요." : selectedLocation.placeName}
                  </InputPlaceName>
                ) : (
                  <InputPlaceName>{address}</InputPlaceName>
                )}
                <LocationButton onClick={address === "" ? onClickLocationBtn : () => null}>
                  <img src="/icons/location.svg" alt="location" width="100%" />
                </LocationButton>
              </InputPlace>
            </InputBottom>
            <UploadButton activate={activate} onClick={handleSaveBtn}>
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
    cursor: pointer;
  }
`;
const ModalContainer = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  /* min-width: 40%; */
  width: 50%;
  /* height: 60%; */
  /* min-height: 50rem; */
  border-radius: 1rem;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

  &::-webkit-scrollbar {
    display: none;
  }
`;
const ModalMain = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: column;
  min-width: ${(props) => (props.isSubOpened ? "40vw" : "40vw")};
  height: 100%;
  z-index: 6;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 6rem;
  box-sizing: border-box;
  position: relative;
`;
const ModalTitle = styled.div`
  ${flexRowCenterAlign}
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 2;
  font-size: 2.5rem;
`;
const ModalHeaderLeftBtn = styled.button`
  ${headerBtn}
  ${flexColumnCenterAlign}
`;
const ModalHeaderRigthBtn = styled.button`
  ${headerBtn}
`;
const ModalContent = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
  margin: 0 1rem 1.5rem;
`;
const ModalLeft = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const ModalRight = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
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
`;
const BackDrop = styled.div`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  position: absolute;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.SECONDARY};
    border-radius: 1rem;
  }
`;
const HighLights = styled.div`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  position: absolute;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
const InputText = styled.textarea`
  ${contentOverflow}
  ${contentWhiteSpace}
  ${contentFont}
  ${contentSize}
  resize: none;
  border: none;
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.8rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.SECONDARY};
    border-radius: 1rem;
  }
  background-color: transparent;
  &:focus {
    outline: none;
  }
`;
const InputBottom = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 5rem;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${COLOR.LIGHTGRAY1};
  min-height: 10rem;
`;
const InputDate = styled.input`
  flex-basis: 20vh;
  border: none;
  font-size: 1.6rem;
  z-index: 3;
`;
const InputPlace = styled.div`
  display: flex;
  width: 100%;
  z-index: 3;
`;
const InputPlaceName = styled.div`
  border: 1px solid black;
  height: 4vh;
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
  & > img {
    ${flexRowCenterAlign}
    cursor: pointer;
  }
`;
const UploadButton = styled.button<{ activate: boolean }>`
  background-color: ${(props) => {
    if (props.activate) return props.theme.PRIMARY;
    else return props.theme.SECONDARY;
  }};
  border: none;
  border-radius: 1rem;
  flex-basis: 3rem;
  color: ${COLOR.WHITE};
  font-size: 1.6rem;
  cursor: ${(props) => {
    if (props.activate) return "pointer";
    else return "not-allowed";
  }};
`;

export default UploadInfoModal;
