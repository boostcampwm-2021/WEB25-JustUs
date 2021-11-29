import { useState, ChangeEvent, KeyboardEvent } from "react";
import COLOR from "@styles/Color";
import styled from "styled-components";
import SearchList from "@components/Header/Profile/Search/SearchList";
import Recommend from "@components/Header/Profile/Search/Recommend";
import { useDispatch } from "react-redux";
import { GroupAction } from "@src/action";
import { icon } from "@src/constants";

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isSearchListOpened, setIsSearchListOpened] = useState<Boolean>(false);
  const [isRecommendOpened, setIsRecommendOpened] = useState<Boolean>(false);
  const dispatch = useDispatch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const doSearch = (hashtagId: number) => {
    setIsSearchListOpened(true);
    setIsRecommendOpened(false);
    dispatch(GroupAction.requestPostsByHashtag({ hashtagId }));
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
        <img src={icon.search} height="90%" alt="search" />
        <SearchInput
          type="text"
          placeholder="해시태그를 입력하세요."
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
  z-index: 6;
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
  width: 100%;
  border: none;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder {
    font-size: 1.6rem;
  }
`;

export default Search;
