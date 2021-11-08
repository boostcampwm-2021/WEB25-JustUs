import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";

interface PostProps {
  idx: number;
  postSelected: number;
  postTitle: string;
  setPostSelected: Dispatch<SetStateAction<number>>;
}

const Post = ({ idx, postTitle, postSelected, setPostSelected }: PostProps) => {
  const onClickPost = () => {
    setPostSelected(idx);
  };

  return (
    <PostWrapper idx={idx} postSelected={postSelected} onClick={onClickPost}>
      {postTitle}
    </PostWrapper>
  );
};

const PostWrapper = styled.div<{ idx: number; postSelected: number; theme: any }>`
  padding-left: 30px;
  color: ${({ postSelected, idx }) => (postSelected === idx ? COLOR.WHITE : COLOR.GRAY)};
  background: ${({ theme, postSelected, idx }) => (postSelected === idx ? theme.SECONDARY : "")};

  &:hover {
    cursor: pointer;
  }
`;

export default Post;
