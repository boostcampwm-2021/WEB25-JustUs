import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";

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
  const onClickPost = () => {
    setPostSelected(idx);
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
    >
      {postTitle}
    </PostWrapper>
  );
};

const PostWrapper = styled.div<{ idx: number; postSelected: number; theme: any }>`
  padding-left: 30px;
  color: ${({ theme, postSelected, idx }) => (postSelected === idx ? COLOR.WHITE : theme.MENUTEXT)};
  background: ${({ theme, postSelected, idx }) => (postSelected === idx ? theme.SECONDARY : "")};

  &:hover {
    cursor: pointer;
  }
`;

export default Post;
