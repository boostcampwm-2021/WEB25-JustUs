import { Dispatch, SetStateAction, useState, useEffect } from "react";
import COLOR from "@src/styles/Color";
import styled from "styled-components";
import { GroupType, IHashtag } from "@src/reducer/GroupReducer";
import { GroupAction } from "@src/action";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { flexRowCenterAlign, scrollbar, shadow } from "@src/styles/StyledComponents";

interface RecommendProps {
  inputKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  doSearch: Function;
}

const Recommend = ({ inputKeyword, setSearchKeyword, doSearch }: RecommendProps) => {
  const {
    selectedGroup,
    hashTags,
    hashTagsError,
  }: { selectedGroup: GroupType; hashTags: IHashtag[]; hashTagsError: boolean } = useSelector(
    (state: RootState) => state.groups,
  );
  const dispatch = useDispatch();
  const [recommendArray, setRecommendArray] = useState<IHashtag[]>([]);

  const recommendTag = (tagList: IHashtag[], input: string) => {
    return tagList.filter((tag) => tag.hashtagContent.indexOf(input) !== -1);
  };

  const onClickHashTag = (e: React.MouseEvent<HTMLSpanElement>) => {
    const clicked = (e.target as HTMLElement).closest(".hashtag-wrapper");
    if (!clicked) return;

    const hashtagId = Number(clicked.getAttribute("data-id"));
    doSearch(hashtagId);
  };

  useEffect(() => {
    selectedGroup && dispatch(GroupAction.requestHashtagsAction({ groupId: selectedGroup.groupId }));
  }, []);

  useEffect(() => {
    setRecommendArray(recommendTag(hashTags, inputKeyword));
  }, [hashTags, inputKeyword]);

  return (
    <SearchListContainer>
      {!hashTagsError ? (
        recommendArray.length ? (
          <>
            <ul>
              {recommendArray.map(({ hashtagId, hashtagContent }) => (
                <li className="hashtag-wrapper" data-id={hashtagId} key={hashtagId} onClick={onClickHashTag}>
                  #<span>{hashtagContent}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <NoResultWrapper>등록된 해시태그가 존재하지 않습니다.</NoResultWrapper>
        )
      ) : (
        <NoResultWrapper>해시태그를 불러올 수 없습니다.</NoResultWrapper>
      )}
    </SearchListContainer>
  );
};

const SearchListContainer = styled.div`
  position: absolute;
  background-color: ${COLOR.WHITE};
  border-radius: 0.5rem;
  top: 4rem;
  z-index: 6;
  width: 30rem;
  box-sizing: border-box;
  max-height: 15rem;
  ${scrollbar}
  ${shadow}
  & ul {
    margin: 0.5rem 0;
    & li {
      float: left;
      margin: 0.5rem;
      background-color: ${(props) => props.theme.SECONDARY};
      border-radius: 2rem;
      padding: 0.8rem;
      color: ${COLOR.WHITE};
      font-size: 1.3rem;
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
