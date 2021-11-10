import { useState, ChangeEvent, KeyboardEvent } from "react";
import COLOR from "@styles/Color";
import styled from "styled-components";

import SearchList from "@components/Header/Profile/Search/SearchList";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isSearchListOpened, setIsSearchListOpened] = useState<Boolean>(false);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && searchKeyword) {
      setIsSearchListOpened(true);
    } else {
      setIsSearchListOpened(false);
    }
  };

  const onClickBackGround = () => {
    setIsSearchListOpened(false);
  };

  return (
    <>
      {isSearchListOpened && <BackGround onClick={onClickBackGround} />}
      <SearchContainer>
        <img src="/icons/search.svg" height="90%" alt="search" />
        <SearchInput
          type="text"
          placeholder="해시태그를 입력하세요."
          onKeyUp={handleKeyPress}
          onChange={handleSearchInputChange}
          value={searchKeyword}
        />
        {isSearchListOpened && (
          <SearchList setSearchKeyword={setSearchKeyword} setIsSearchListOpened={setIsSearchListOpened} />
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
`;

export default Search;
