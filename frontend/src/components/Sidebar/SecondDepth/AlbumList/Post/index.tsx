import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { ModalAction } from "@src/action";

interface PostProps {
  idx: number;
  albumIdx: number;
  postSelected: number;
  postTitle: string;
  setPostSelected: Dispatch<SetStateAction<number>>;
  PostDragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  PostDragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  album: any;
}

const Post = ({
  idx,
  postTitle,
  postSelected,
  setPostSelected,
  PostDragHandler,
  PostDragEndHandler,
  albumIdx,
  album,
}: PostProps) => {
  const dispatch = useDispatch();

  const onClickPost = () => {
    setPostSelected(idx);
    dispatch(ModalAction.selectPostRequestAction(idx));
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
      data-album-id={album.albumId}
    >
      <PostTitle title={postTitle}>{postTitle}</PostTitle>
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
  width: 15rem;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    font-weight: bold;
  }
`;

export default React.memo(Post);
