import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Color from "@components/Styles/Color";

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
  color: ${({ postSelected, idx }) => (postSelected === idx ? Color.white : Color.gray)};
  background: ${({ postSelected, idx }) => (postSelected === idx ? Color["theme1-secondary"] : "")};

  &:hover {
    cursor: pointer;
  }
`;

export default Post;
