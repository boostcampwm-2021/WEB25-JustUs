import styled, { keyframes } from "styled-components";
import COLOR from "@src/styles/Color";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { flexRowCenterAlign, flexColumnCenterAlign, iconHover } from "@styles/StyledComponents";
import SearchResult from "@components/Modal/PostCreateModal/UploadInfoModal/SearchResult";
import { useDispatch } from "react-redux";
import { ToastAction } from "@src/action";
import { toastMessage } from "@src/constants";

interface IData {
  [key: string]: string;
}

interface IPagination {
  [key: string]: string;
}
interface ILocation {
  placeName: string;
  x: number;
  y: number;
}
interface ModalSubProps {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  isSubOpened: boolean;
  setIsSubOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedLocation: Dispatch<SetStateAction<ILocation>>;
  searchResult: IData[];
  setSearchResult: Dispatch<SetStateAction<IData[]>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastPage: number;
  setLastPage: Dispatch<SetStateAction<number>>;
  gobackClicked: boolean;
  setGobackClicked: Dispatch<SetStateAction<boolean>>;
}

const ModalSub = ({
  searchKeyword,
  setSearchKeyword,
  isSubOpened,
  setIsSubOpened,
  setSelectedLocation,
  searchResult,
  setSearchResult,
  page,
  setPage,
  lastPage,
  setLastPage,
  gobackClicked,
  setGobackClicked,
}: ModalSubProps) => {
  const [input, setInput] = useState<string>("");
  const dispatch = useDispatch();
  const SEARCH_ICON = "/icons/search.svg";
  const SEARCH_PART_CLOSE_ICON = "/icons/arrow-left.svg";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const el = e.target as HTMLInputElement;
    const keyword = el.value;
    setSearchKeyword(keyword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onClickCloseBtn = () => {
    setIsSubOpened(false);
    setSearchKeyword(input);
    setGobackClicked(true);
  };

  const execSearch = (keyword: string, nowPage: number) => {
    const ps = new window.kakao.maps.services.Places();
    const placesSearchCB = (data: IData[], status: number, pagination: IPagination) => {
      if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        dispatch(ToastAction.setErrorToastAction({ text: toastMessage.noSearchList }));
        return;
      }

      if (status === window.kakao.maps.services.Status.ERROR) {
        return;
      }

      if (nowPage === 1) {
        setSearchResult([...data]);
        setPage(1);
        setLastPage(Number(pagination.last));
        return;
      }

      setSearchResult([...searchResult, ...data]);
    };

    ps.keywordSearch(keyword, placesSearchCB, { page: nowPage });
  };

  useEffect(() => {
    setInput(searchKeyword);
  }, []);

  useEffect(() => {
    if (input === "") return;
    execSearch(input, 1);
  }, [searchKeyword]);

  useEffect(() => {
    if (input === "") return;
    execSearch(input, page);
  }, [page]);

  if (!isSubOpened && !gobackClicked) return null;

  return (
    <ModalSubWrapper isToggle={isSubOpened}>
      <ModalHeader className="header-sub">
        <SearchContainer>
          <img src={SEARCH_ICON} height="90%" alt="search" />
          <SearchInput
            type="text"
            placeholder="지역명을 입력하세요."
            onKeyDown={handleKeyPress}
            value={input}
            onChange={handleInputChange}
            spellCheck={false}
          />
        </SearchContainer>
      </ModalHeader>
      {!!searchResult.length && (
        <SearchResult
          searchResult={searchResult}
          setSelectedLocation={setSelectedLocation}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
        />
      )}
      <CloseBtn onClick={onClickCloseBtn} isToggle={isSubOpened}>
        <img src={SEARCH_PART_CLOSE_ICON} alt="search part close" />
      </CloseBtn>
    </ModalSubWrapper>
  );
};

const SidebarOpen = keyframes`
  0% {
    opacity: 1;
    width: 10px;
    visibility: hidden;
  }
  60% {
    opacity: 1;
    visibility: hidden;
  }
`;
const SidebarHide = keyframes`
  0% {
    opacity: 1;
    width: 15vw;
    overflow: hidden;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;
const Opening = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalSubWrapper = styled.div<{ isToggle: boolean }>`
  visibility: ${(props) => (props.isToggle ? "visible" : "hidden")};
  position: relative;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLOR.GRAY};
  width: ${(props) => (props.isToggle ? "15vw" : "0")};
  z-index: ${(props) => (props.isToggle ? 4 : 0)};
  animation-name: ${(props) => (props.isToggle ? SidebarOpen : SidebarHide)};
  animation-duration: 1s;
`;
const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 10% 80% 10%;
  height: 6rem;
  box-sizing: border-box;
  font-size: 1.6rem;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  height: 3vh;
  width: 100%;
  border-radius: 5px;
  & > img {
    margin: 0 1rem;
  }
`;
const SearchInput = styled.input`
  min-width: 20rem;
  min-height: 10rem;
  border: none;
  background: transparent;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-size: 1.6rem;
  }
`;
const CloseBtn = styled.div<{ isToggle: boolean }>`
  ${flexRowCenterAlign}
  position: absolute;
  left: 95%;
  padding: 0 1rem;
  background-color: ${COLOR.WHITE};
  border-radius: 0 1rem 1rem 0;
  height: 6rem;
  cursor: pointer;
  z-index: 1;
  animation-name: ${(props) => (props.isToggle ? Opening : "")};
  animation-duration: 1s;
  & > img {
    ${iconHover};
  }
`;

export default ModalSub;
