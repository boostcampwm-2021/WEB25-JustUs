import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import color from "@styles/Color";

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

const PostWrapper = styled.div<{ idx: number; postSelected: number }>`
  postselected: ${props => props.postSelected};
  padding-left: 30px;
  color: ${({ postSelected, idx }) => (postSelected === idx ? color.white : color.gray)};
  background: ${({ postSelected, idx }) => (postSelected === idx ? color.theme1.secondary : "")};

  &:hover {
    cursor: pointer;
  }
`;

export default Post;
