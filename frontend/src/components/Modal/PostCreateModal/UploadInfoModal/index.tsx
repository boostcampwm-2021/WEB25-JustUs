/*global kakao*/
import React, { useEffect, useState, useRef, ChangeEvent } from "react";
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

interface IData {
  [key: string]: string;
}

interface IPagination {
  [key: string]: string;
}

const SearchResult = ({ searchResult }: any) => {
  console.log("in SearchResult, searchResult : ", searchResult);
  return (
    <SearchResultWrapper>
      {searchResult.map((location: IData) => (
        <PlaceWrapper>
          <PlaceName>{location.place_name}</PlaceName>
          <AddressName>{location.address_name}</AddressName>
        </PlaceWrapper>
      ))}
    </SearchResultWrapper>
  );
};

const UploadInfoModal = ({ changeMode, files }: UploadInfoModalProps) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [activate, setActivate] = useState<boolean>(false);
  const [isSubOpened, setIsSubOpened] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Array<IData>>([]);
  const dispatch = useDispatch();
  const highlightsRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const handelTitleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
    setTitle(value);
  };

  const handelTextInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.target as HTMLTextAreaElement;
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
    setIsSubOpened((prev) => !prev);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };
  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const el = e.target as HTMLInputElement;
    const keyword = el.value;
    const ps = new window.kakao.maps.services.Places();
    const placesSearchCB = (data: IData[], status: number, pagination: IPagination) => {
      if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      }

      if (status === window.kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }

      console.log(`data : ${data}, status : ${status}, pagination : ${pagination}`);

      for (const location of data) {
        console.log("location : ", location);
      }
      console.log("data.length : ", data.length);
      console.log(pagination);

      setSearchResult(data);
    };

    ps.keywordSearch(keyword, placesSearchCB);
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
      isSubOpened={isSubOpened}
    >
      <ModalMain>
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
              <InputDate type="date" />
              <InputPlace>
                <InputPlaceName>장소이름</InputPlaceName>
                <LocationButton onClick={onClickLocationBtn}>
                  <img src="/icons/location.svg" width="100%" />
                </LocationButton>
              </InputPlace>
            </InputBottom>
            <UploadButton activate={activate}>게시하기</UploadButton>
          </ModalRight>
        </ModalContent>
      </ModalMain>

      {isSubOpened && (
        <ModalSub>
          <ModalHeader>
            <SearchContainer>
              <img src="/icons/search.svg" height="90%" alt="search" />
              <SearchInput
                type="text"
                placeholder="지역명을 입력하세요."
                onKeyPress={handleKeyPress}
                onChange={handleSearchInputChange}
                value={searchKeyword}
              />
            </SearchContainer>
          </ModalHeader>
          {searchResult.length && <SearchResult searchResult={searchResult} />}
        </ModalSub>
      )}
    </ModalContainer>
  );
};

export default UploadInfoModal;
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
  font-size: 1rem;
  cursor: ${(props) => {
    if (props.activate) return "pointer";
    else return "not-allowed";
  }};
  z-index: 3;
  position: relative;
  top: -200px;
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
  position: relative;
  top: -200px;
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
  z-index: 3;
`;
const InputDate = styled.input`
  flex-basis: 20vh;
  border: none;
  font-size: 1rem;
  padding-right: 5px;
  z-index: 3;
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
  position: relative;
  top: -200px;
  font-size: 1.2rem;
  border: none;
  resize: none;
  margin-bottom: 2vh;
  z-index: 2;
  overflow: auto;
  width: 400px;
  height: 200px;
  background-color: transparent;
  font-family: "NanumGothic", sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1rem;

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
    font-size: 1.2rem;
    line-height: 1rem;
    pointer-events: none;
    width: 400px;
    height: 200px;

    & mark {
      border-radius: 3px;
      color: transparent;
      background-color: ${COLOR.THEME1.SECONDARY};
      letter-spacing: normal;
      font-size: 1.2rem;
      width: 400px;
      height: 200px;
      overflow: auto;
    }

    & > .highlights {
      white-space: pre-wrap;
      word-wrap: break-word;
      color: transparent;
      font-size: 1.2rem;
      resize: none;
      width: 400px;
      height: 200px;
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
  width: ${(props) => (props.isSubOpened ? "1000px" : "850px")};
  height: 530px;
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;

const ModalMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const ModalSub = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLOR.BLACK};
  z-index: 3;
  width: 300px;
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3vh;
  width: 100%;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;
  padding: 0.5vh 0;
  & > img {
    padding: 0 0.5vw;
  }
`;

const SearchInput = styled.input`
  height: 90%;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

const SearchResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const PlaceWrapper = styled.div`
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.BLACK};
  &:hover {
    background: ${COLOR.GRAY};
  }
`;

const PlaceName = styled.div`
  font-size: 1rem;
  font-weight: bold;
`;

const AddressName = styled.div`
  font-size: 0.8rem;
`;
