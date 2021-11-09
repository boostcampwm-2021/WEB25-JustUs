import styled from "styled-components";
import COLOR from "@src/styles/Color";
import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import SearchResult from "@components/Modal/PostCreateModal/UploadInfoModal/SearchResult";

interface IData {
  [key: string]: string;
}

interface IPagination {
  [key: string]: string;
}

interface ISearchResult {
  data: IData[];
  pagination: IPagination;
}

interface ModalSubProps {
  setIsSubOpened: Dispatch<SetStateAction<boolean>>;
  setSelectedLocation: Dispatch<SetStateAction<IData>>;
}

const ModalSub = ({ setIsSubOpened, setSelectedLocation }: ModalSubProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [searchResult, setSearchResult] = useState<IData[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const el = e.target as HTMLInputElement;
    const keyword = el.value;
    setSearchKeyword(keyword);
  };

  const onClickCloseBtn = () => {
    setIsSubOpened(false);
  };

  const execSearch = (keyword: string, nowPage: number) => {
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

      if (nowPage === 1) {
        setSearchResult([...data]);
        setPage(1);
        return;
      }

      setSearchResult([...searchResult, ...data]);
    };

    ps.keywordSearch(keyword, placesSearchCB, { page: nowPage });
  };

  useEffect(() => {
    if (!searchInputRef.current || !searchInputRef.current.value) return;
    const keyword = searchInputRef.current.value as string;
    execSearch(keyword, 1);
  }, [searchKeyword]);

  useEffect(() => {
    if (!searchInputRef.current || !searchInputRef.current.value) return;
    const keyword = searchInputRef.current.value as string;
    execSearch(keyword, page);
  }, [page]);

  return (
    <ModalSubWrapper>
      <ModalHeader className="header-sub">
        <SearchContainer>
          <img src="/icons/search.svg" height="90%" alt="search" />
          <SearchInput
            ref={searchInputRef}
            type="text"
            placeholder="지역명을 입력하세요."
            onKeyPress={handleKeyPress}
          />
        </SearchContainer>
      </ModalHeader>
      {!!searchResult.length && (
        <SearchResult
          searchResult={searchResult}
          setSelectedLocation={setSelectedLocation}
          page={page}
          setPage={setPage}
        />
      )}
      <CloseBtn onClick={onClickCloseBtn}>
        <img src="/icons/arrow-left.svg" alt="arrow left icon" />
      </CloseBtn>
    </ModalSubWrapper>
  );
};

const ModalSubWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${COLOR.BLACK};
  z-index: 3;
  width: 300px;
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
const CloseBtn = styled.div`
  ${flexRowCenterAlign}
  position: absolute;
  left: 85%;
  width: 3rem;
  height: 3.71rem;
  background-color: ${COLOR.WHITE};
  border-radius: 1rem;
  cursor: pointer;
  z-index: 1;
`;

export default ModalSub;
