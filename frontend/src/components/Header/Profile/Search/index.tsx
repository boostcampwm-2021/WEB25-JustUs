import { useState, ChangeEvent, KeyboardEvent } from "react";
import COLOR from "@styles/Color";
import styled from "styled-components";

import SearchList from "@components/Header/Profile/Search/SearchList";
import Recommend from "@components/Header/Profile/Search/Recommend";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isSearchListOpened, setIsSearchListOpened] = useState<Boolean>(false);
  const [isRecommendOpened, setIsRecommendOpened] = useState<Boolean>(false);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchKeyword) {
      (document.activeElement as HTMLElement).blur();
      doSearch(searchKeyword);
    }
  };

  const doSearch = (key: string) => {
    setIsSearchListOpened(true);
    setIsRecommendOpened(false);
  };

  const onFocusInput = () => {
    setIsRecommendOpened(true);
    setIsSearchListOpened(false);
  };

  const onClickBackGround = () => {
    setIsSearchListOpened(false);
    setIsRecommendOpened(false);
  };

  return (
    <>
      {(isSearchListOpened || isRecommendOpened) && <BackGround onClick={onClickBackGround} />}
      <SearchContainer>
        <img src="/icons/search.svg" height="90%" alt="search" />
        <SearchInput
          type="text"
          placeholder="해시태그를 입력하세요."
          onKeyUp={handleKeyPress}
          onChange={handleSearchInputChange}
          value={searchKeyword}
          onFocus={onFocusInput}
          spellCheck={false}
        />
        {isSearchListOpened && (
          <SearchList setSearchKeyword={setSearchKeyword} setIsSearchListOpened={setIsSearchListOpened} />
        )}
        {isRecommendOpened && (
          <Recommend setSearchKeyword={setSearchKeyword} inputKeyword={searchKeyword} doSearch={doSearch} />
        )}
      </SearchContainer>
    </>
  );
};

const BackGround = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  z-index: 3;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3vh;
  width: 25vw;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;
  padding: 0.5vh 0;
  z-index: 6;
  & > img {
    padding: 0 0.5vw;
  }
`;

const SearchInput = styled.input`
  height: 100%;
  width: 80%;
  border: none;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-size: 1.6rem;
  }
`;

export default Search;
