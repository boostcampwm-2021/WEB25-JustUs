import COLOR from "@src/styles/Color";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { PostType } from "@src/reducer/GroupReducer";
import { ModalAction } from "@src/action";

interface SearchListContent {
  postId: number;
  postTitle: string;
}

const SearchList = () => {
  const { searchList }: { searchList: PostType[] } = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const onClickPost = (postId: number) => {
    dispatch(ModalAction.selectPostRequestAction(postId));
    dispatch(ModalAction.closeSearchList());
  };

  return (
    <SearchListContainer>
      <ul>
        {searchList.map(({ postId, postTitle }: SearchListContent) => (
          <li
            key={postId}
            onClick={() => {
              onClickPost(postId);
            }}
          >
            {postTitle}
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
      font-size: 1.6rem;
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
