import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Post from "./Post";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const AlbumList = () => {
  const [postSelected, setPostSelected] = useState<number>(0);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  return (
    <>
      {selectedGroup.albumList &&
        selectedGroup.albumList.map((album: any) => {
          return (
            <AlbumWrapper key={album.albumID}>
              <Header albumName={album.albumName}></Header>
              {album.posts.map((post: any) => (
                <Post
                  key={post.postID}
                  idx={post.postID}
                  postSelected={postSelected}
                  postTitle={post.postTitle}
                  setPostSelected={setPostSelected}
                />
              ))}
            </AlbumWrapper>
          );
        })}
    </>
  );
};

const AlbumWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
`;

export default AlbumList;
