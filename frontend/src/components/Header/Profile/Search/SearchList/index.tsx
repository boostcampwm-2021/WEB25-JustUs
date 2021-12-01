import COLOR from "@src/styles/Color";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { PostType } from "@src/reducer/GroupReducer";
import { ModalAction } from "@src/action";
import { scrollbar, shadow } from "@src/styles/StyledComponents";

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
  border-radius: 0.5rem;
  top: 5.5vh;
  z-index: 6;
  width: 25vw;
  box-sizing: border-box;
  max-height: 15rem;
  ${scrollbar}
  ${shadow}
  & ul {
    max-height: 20vh;
    margin: 1.5vw 0 1.5vw 1.5vw;
    & li {
      padding: 0.5rem;
      border-bottom: 0.1rem solid ${COLOR.GRAY};
      font-size: 1.4rem;
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
