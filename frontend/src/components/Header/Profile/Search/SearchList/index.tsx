import { MouseEvent, Dispatch, SetStateAction } from "react";
import COLOR from "@src/styles/Color";
import styled from "styled-components";

interface SearchListContent {
  id: number;
  name: string;
}

interface SearchListProps {
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  setIsSearchListOpened: Dispatch<SetStateAction<Boolean>>;
}

const SearchList = ({ setSearchKeyword, setIsSearchListOpened }: SearchListProps) => {
  const searchListContents: SearchListContent[] = [
    { id: 0, name: "미삼집 관련 게시글" },
    { id: 1, name: "맥도날드 관련 게시글" },
    { id: 2, name: "농성화로 관련 게시글" },
    { id: 3, name: "아웃백 관련 게시글" },
    { id: 4, name: "버거킹 관련 게시글" },
    { id: 5, name: "롯데리아 관련 게시글" },
    { id: 6, name: "kfc 관련 게시글" },
    { id: 7, name: "포도주 관련 게시글" },
    { id: 8, name: "솥뚜껑 관련 게시글" },
    { id: 9, name: "팔팔소곱창 관련 게시글" },
    { id: 10, name: "청해 관련 게시글" },
  ];

  const handleClickSearchListItem = (e: HTMLElement) => {
    setSearchKeyword(e.innerText);
    setIsSearchListOpened(false);
  };

  return (
    <SearchListContainer>
      <ul>
        {searchListContents.map(({ id, name }: SearchListContent) => (
          <li
            key={id}
            onClick={(e: MouseEvent<HTMLElement>) => {
              handleClickSearchListItem(e.target as HTMLElement);
            }}
          >
            {name}
          </li>
        ))}
      </ul>
    </SearchListContainer>
  );
};
const SearchListContainer = styled.div`
  position: absolute;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;
  top: 5.5vh;
  z-index: 6;
  width: 25vw;
  font-size: 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.6vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.LIGHTGRAY2};
    border-radius: 5px;
  }
  & ul {
    max-height: 20vh;
    margin: 1.5vw 0 1.5vw 1.5vw;
    & li {
      padding: 1vh 0 1vh 1vh;
      margin: 0 1.5vw 0 0;
      border-bottom: 1px solid ${COLOR.GRAY};
      font-size: 0.8rem;
      &:hover {
        font-weight: bold;
        cursor: pointer;
      }
      &:nth-child(1) {
        padding-top: 0;
      }
      &:nth-last-child(1) {
        padding-bottom: 1.2vh;
      }
    }
  }
`;

export default SearchList;
