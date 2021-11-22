import { Dispatch, SetStateAction, useState, useEffect } from "react";
import COLOR from "@src/styles/Color";
import styled from "styled-components";
import { GroupType, IHashtag, requestHashtagsAction } from "@src/reducer/GroupReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";

interface RecommendProps {
  inputKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  doSearch: Function;
}

const Recommend = ({ inputKeyword, setSearchKeyword, doSearch }: RecommendProps) => {
  const { selectedGroup, hashTags }: { selectedGroup: GroupType; hashTags: IHashtag[] } = useSelector(
    (state: RootState) => state.groups,
  );
  const dispatch = useDispatch();
  const [recommendArray, setRecommendArray] = useState<IHashtag[]>([]);

  const recommendTag = (tagList: IHashtag[], input: string) => {
    return tagList.filter((tag) => tag.hashtagContent.indexOf(input) !== -1);
  };

  const onClickHashTag = (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedTag = (e.target as HTMLElement).innerHTML;
    setSearchKeyword(selectedTag);
    doSearch(selectedTag);
  };

  useEffect(() => {
    selectedGroup && dispatch(requestHashtagsAction({ groupId: selectedGroup.groupId }));
  }, []);

  useEffect(() => {
    setRecommendArray(recommendTag(hashTags, inputKeyword));
  }, [hashTags, inputKeyword]);

  return (
    <SearchListContainer>
      {recommendArray.length > 0 ? (
        <>
          <ul>
            {recommendArray.map(({ hashtagId, hashtagContent }) => (
              <li key={hashtagId}>
                #<span onClick={onClickHashTag}>{hashtagContent}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <NoResultWrapper>등록된 해시태그가 존재하지 않습니다.</NoResultWrapper>
      )}
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
      font-size: 1.4rem;
      &:hover {
        background-color: ${(props) => props.theme.PRIMARY};
        cursor: pointer;
      }
    }
  }
`;
const NoResultWrapper = styled.div`
  ${flexRowCenterAlign};
  height: 15rem;
  font-size: 1.6rem;
`;

export default Recommend;
