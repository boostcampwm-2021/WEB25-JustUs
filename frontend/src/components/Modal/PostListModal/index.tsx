import styled from "styled-components";

interface Imarker {
  postTitle: string | undefined;
  postId: number;
}

interface Theme {
  [Key: string]: string;
}

interface IPostList {
  clusteredMarker: Imarker[];
  handleClickMarker: (postId: number) => void;
  nowTheme: Theme;
}

const PostListModal = ({ clusteredMarker, handleClickMarker, nowTheme }: IPostList) => {
  return (
    <ItemContainer color={nowTheme.SECONDARY}>
      {clusteredMarker.map((marker: Imarker) => (
        <MarkerItem key={marker.postId} color={nowTheme.SECONDARY} onClick={() => handleClickMarker(marker.postId)}>
          {marker.postTitle}
        </MarkerItem>
      ))}
    </ItemContainer>
  );
};
export default PostListModal;

const ItemContainer = styled.ul`
  padding: 0.3rem;
  width: 20rem;
  height: 10rem;
  overflow-y: scroll;
  box-sizing: content-box;

  &::-webkit-scrollbar {
    width: 1rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.color};
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const MarkerItem = styled.li`
  height: 2rem;
  padding: 0.4rem;
  cursor: pointer;
  line-height: 2rem;
  font-size: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    background-color: ${(props) => props.color};
  }
`;
