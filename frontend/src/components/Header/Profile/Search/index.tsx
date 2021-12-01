import { useState, ChangeEvent } from "react";
import COLOR from "@styles/Color";
import styled from "styled-components";
import SearchList from "@components/Header/Profile/Search/SearchList";
import Recommend from "@components/Header/Profile/Search/Recommend";
import { useDispatch } from "react-redux";
import { GroupAction, ModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { icon } from "@src/constants";

const Search = () => {
  const { isSearchListOpened, isRecommendOpened } = useSelector((state: RootState) => state.modal);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const dispatch = useDispatch();

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const doSearch = (hashtagId: number) => {
    dispatch(ModalAction.openSearchList());
    dispatch(ModalAction.closeRecommendList());
    dispatch(GroupAction.requestPostsByHashtag({ hashtagId }));
  };

  const onFocusInput = () => {
    dispatch(ModalAction.openRecommendList());
    dispatch(ModalAction.closeSearchList());
  };

  return (
    <>
      <SearchContainer className="search-container">
        <img src={icon.search} height="90%" alt="search" />
        <SearchInput
          type="text"
          placeholder="해시태그를 입력하세요."
          onChange={handleSearchInputChange}
          value={searchKeyword}
          onFocus={onFocusInput}
          spellCheck={false}
        />
        {isSearchListOpened && <SearchList />}
        {isRecommendOpened && (
          <Recommend setSearchKeyword={setSearchKeyword} inputKeyword={searchKeyword} doSearch={doSearch} />
        )}
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 3vh;
  width: 25vw;
  background-color: ${COLOR.WHITE};
  border-radius: 0.5rem;
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
  font-size: 1.5rem;
  line-height: 100%;
  &::placeholder {
    height: 100%;
    line-height: 100%;
  }

  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder {
    height: 100%;
    line-height: 110%;
    font-size: 90%;
  }
`;

export default Search;
