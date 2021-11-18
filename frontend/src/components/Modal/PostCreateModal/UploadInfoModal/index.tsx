/*global kakao*/
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "@components/Modal/PostCreateModal/UploadInfoModal/Carousel";
import { RootState } from "@src/reducer";
import ModalSub from "./ModalSub";
import dummyPosts from "@components/Map/dummyPosts";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface IData {
  [key: string]: string;
}
interface UploadInfoModalProps {
  mode: string;
  changeMode: () => void;
  files: FileObject[];
  prevTitle: string | "";
  prevText: string | "";
  prevDate: string | "";
  prevLocation: IData | {};
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
  const [date, setDate] = useState<string>(prevDate);
  const [selectedLocation, setSelectedLocation] = useState<IData>(prevLocation);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [gobackClicked, setGobackClicked] = useState<boolean>(false);
  const highlightsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { address }: any = useSelector((state: RootState) => state.address);
  const { selectedPost }: { selectedPost: IselectedPost } = useSelector((state: RootState) => state.modal);
  const { selectedGroup, albumList }: any = useSelector((state: RootState) => state.groups);

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
    const highlightedText = textParam.replace(/\n$/g, "\n\n").replace(/#([\w|ㄱ-ㅎ|가-힣]+)/g, "<mark>$&</mark>");
    return highlightedText;
  };

  const handleScroll = () => {
    const scrollTop = inputRef.current?.scrollTop as number;

    if (!backdropRef.current) return;
    highlightsRef.current.scrollTop = scrollTop;
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
        postLocation: selectedLocation.address_name,
        postLatitude: Number(selectedLocation.y),
        postLongitude: Number(selectedLocation.x),
        // 추후 selectedGroup.groupID 으로 바꿔줘야함
        groupId: 1,
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
        postLocation: selectedLocation.address_name,
        postLatitude: Number(selectedLocation.y),
        postLongitude: Number(selectedLocation.x),
        addImages: newFileList,
        deleteImagesId: deleteFileList,
      };

      dispatch({ type: "UPDATE_POST_REQUEST", post: updatePost });
    }

    closeModal();
  };

  useEffect(() => {
    if (title.length === 0) setActivate(false);
    else setActivate(true);
  }, [title]);

  return (
    <ModalContainer
      onClick={(event) => {
        event.nativeEvent.stopImmediatePropagation();
      }}
      isSubOpened={isSubOpened}
    >
      <ModalMain isSubOpened={isSubOpened}>
        <ModalHeader>
          <ModalTitle>{mode == "create" ? "새 게시물 만들기" : "게시물 수정"}</ModalTitle>
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
            <div className="backdrop" ref={backdropRef}>
              <div ref={highlightsRef} className="highlights"></div>
            </div>
            <InputText
              ref={inputRef}
              placeholder="내용"
              value={text}
              onChange={handelTextInput}
              onScroll={handleScroll}
            />
            <InputBottom>
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
                    {Object.keys(selectedLocation).length === 0 ? "장소를 선택하세요." : selectedLocation.place_name}
                  </InputPlaceName>
                ) : (
                  <InputPlaceName>{address}</InputPlaceName>
                )}
                <LocationButton onClick={onClickLocationBtn}>
                  <img src="/icons/location.svg" width="100%" />
                </LocationButton>
              </InputPlace>
            </InputBottom>
            <UploadButton activate={activate} onClick={handleSaveBtn}>
              {mode == "create" ? "게시하기" : "수정하기"}
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

const UploadButton = styled.button<{ activate: boolean }>`
  background-color: ${(props) => {
    if (props.activate) return props.theme.PRIMARY;
    else return props.theme.SECONDARY;
  }};
  border: 1px solid ${(props) => props.theme.PRIMARY};
  border-radius: 10px;
  flex-basis: 3rem;
  margin-top: 1rem;
  color: ${COLOR.WHITE};
  font-size: 1.6rem;
  cursor: ${(props) => {
    if (props.activate) return "pointer";
    else return "not-allowed";
  }};
  z-index: 3;
  position: relative;
  top: -20rem;
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
  margin-right: 3rem;
  flex-basis: 90%;
  text-align: right;
  color: ${COLOR.DARKGRAY};
  font-size: 1.6rem;
`;
const InputBottom = styled.div`
  position: relative;
  top: -20rem;
  display: flex;
  flex-direction: column;
  max-height: 5rem;
  justify-content: space-between;
  align-items: flex-end;
  border-top: 1px solid ${COLOR.LIGHTGRAY1};
  padding-right: 2rem;
  min-height: 10rem;
`;
const InputPlace = styled.div`
  display: flex;
  width: 100%;
  z-index: 3;
`;
const InputDate = styled.input`
  flex-basis: 20vh;
  border: none;
  font-size: 1.6rem;
  padding-right: 5px;
  z-index: 3;
`;
const InputTitle = styled.input`
  flex-basis: 5vh;
  margin-bottom: 2vh;
  border: none;
  border-bottom: 1px solid ${COLOR.LIGHTGRAY1};
  font-size: 1.6rem;
  &:focus {
    outline: none;
  }
`;
const InputText = styled.textarea`
  position: relative;
  top: -20rem;
  border: none;
  resize: none;
  margin-bottom: 2vh;
  z-index: 2;
  overflow: auto;
  width: 100%;
  height: 20rem;
  background-color: transparent;
  margin: 0;
  padding: 0;
  line-height: 2rem;
  font-size: 1.6rem;

  &:focus {
    outline: none;
  }
`;
const ModalRight = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1vh;
  padding-top: 2vh;
  height: 100%;

  & > .backdrop {
    z-index: 1;
    background-color: ${COLOR.WHITE};
    pointer-events: none;
    font-size: 1.6rem;
    pointer-events: none;
    width: 100%;
    height: 20rem;
    line-height: 2rem;

    & mark {
      border-radius: 3px;
      color: transparent;
      background-color: ${COLOR.THEME1.SECONDARY};
      letter-spacing: normal;
      font-size: 1.6rem;
      width: 100%;
      height: 20rem;
      overflow: auto;
    }

    & > .highlights {
      white-space: pre-wrap;
      word-wrap: break-word;
      color: transparent;
      font-size: 1.6rem;
      resize: none;
      width: 100%;
      height: 20rem;
      overflow: auto;
    }
  }
`;
const ModalLeft = styled.div`
  width: 100%;
  height: 45vh;
`;
const ModalContent = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: 50% 50%;
  box-sizing: border-box;
`;
const ModalContainer = styled.div<{ isSubOpened: boolean }>`
  display: flex;
  flex-direction: row;
  background-color: ${COLOR.WHITE};
  min-width: 40vw;
  height: 55rem;
  border-radius: 10px;
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
  font-size: 2.5rem;
`;

export default UploadInfoModal;
