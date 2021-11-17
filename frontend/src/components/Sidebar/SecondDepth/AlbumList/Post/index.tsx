import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import dummyPosts from "@components/Map/dummyPosts";

interface PostProps {
  idx: number;
  albumIdx: number;
  postSelected: number;
  postTitle: string;
  setPostSelected: Dispatch<SetStateAction<number>>;
  PostDragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  PostDragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
}

const Post = ({
  idx,
  postTitle,
  postSelected,
  setPostSelected,
  PostDragHandler,
  PostDragEndHandler,
  albumIdx,
}: PostProps) => {
  const dispatch = useDispatch();

  const onClickPost = () => {
    setPostSelected(idx);
    // 아래 로직은 나중에 백엔드 API 요청을 통해 클릭한 게시글의 상세 정보를 가져온다.
    const targetPost = dummyPosts.find((post) => post.postID === Number(idx));
    dispatch({ type: "SET_SELECTED_POST", payload: targetPost });
    dispatch({ type: "OPEN_MODAL", payload: "PostShowModal" });
  };

  return (
    <PostWrapper
      className="postItem"
      idx={idx}
      postSelected={postSelected}
      onClick={onClickPost}
      onDrag={PostDragHandler}
      draggable={true}
      onDragEnd={PostDragEndHandler}
      data-id={idx}
      data-albumidx={albumIdx}
      onDragOver={(e) => e.preventDefault()}
    >
      <PostTitle>{postTitle}</PostTitle>
    </PostWrapper>
  );
};

const PostWrapper = styled.div<{ idx: number; postSelected: number; theme: any }>`
  color: ${({ theme, postSelected, idx }) => (postSelected === idx ? COLOR.WHITE : theme.MENUTEXT)};
  background: ${({ theme, postSelected, idx }) => (postSelected === idx ? theme.SECONDARY : "")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 20rem;

  &:hover {
    cursor: pointer;
  }
`;
const PostTitle = styled.div`
  padding: 0.5rem 0 0.5rem 3rem;
`;

export default Post;
