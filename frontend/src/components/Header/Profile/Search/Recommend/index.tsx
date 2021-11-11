import { Dispatch, MouseEventHandler, ReactEventHandler, SetStateAction } from "react";
import COLOR from "@src/styles/Color";
import styled from "styled-components";

interface RecommendProps {
  inputKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  doSearch: Function;
}
interface TagType {
  id: number;
  name: string;
}

const Recommend = ({ inputKeyword, setSearchKeyword, doSearch }: RecommendProps) => {
  const allTagList = [
    { id: 0, name: "미삼집" },
    { id: 1, name: "맥도날드" },
    { id: 2, name: "농성화로" },
    { id: 3, name: "아웃백" },
    { id: 4, name: "버거킹" },
    { id: 5, name: "롯데리아" },
    { id: 6, name: "kfc" },
    { id: 7, name: "포도주" },
    { id: 8, name: "솥뚜껑" },
    { id: 9, name: "팔팔소곱창" },
    { id: 10, name: "청해" },
    { id: 11, name: "맥도널드" },
    { id: 12, name: "청헤" },
  ];

  const recommendTag = (tagList: TagType[], input: string) => {
    const recommendArray = tagList.filter((tag) => tag.name.indexOf(input) !== -1);
    return recommendArray;
  };

  const recommendArray = recommendTag(allTagList, inputKeyword);

  const onClickHashTag = (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedTag = (e.target as HTMLElement).innerHTML;
    setSearchKeyword(selectedTag);
    doSearch(selectedTag);
  };

  return (
    <SearchListContainer>
      {recommendArray.length > 0 ? (
        <>
          <ul>
            {recommendArray.map(({ id, name }) => (
              <li key={id}>
                #<span onClick={onClickHashTag}>{name}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}
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
  box-sizing: border-box;
  overflow-y: scroll;
  max-height: 20vh;
  &::-webkit-scrollbar {
    width: 0.6vw;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.LIGHTGRAY2};
    border-radius: 5px;
  }
  & ul {
    margin: 0.5vw;
    & li {
      float: left;
      margin: 8px;

      background-color: ${(props) => props.theme.SECONDARY};
      border-radius: 20px;
      padding: 0.4vw;
      color: ${COLOR.WHITE};
      font-size: 0.8rem;
      &:hover {
        background-color: ${(props) => props.theme.PRIMARY};
        cursor: pointer;
      }
    }
  }
`;

export default Recommend;
