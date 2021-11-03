import { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Post from "./Post";

const albumDummy = [
  {
    albumID: 0,
    albumName: "일상 데이트",
    posts: [
      { postID: 0, postTitle: "돼지세끼" },
      { postID: 1, postTitle: "미삼집" },
      { postID: 2, postTitle: "남산서울타워" },
    ],
  },
  {
    albumID: 1,
    albumName: "2020 일본 여행",
    posts: [{ postID: 3, postTitle: "후쿠오카" }],
  },
  {
    albumID: 2,
    albumName: "기본 앨범",
    posts: [
      { postID: 4, postTitle: "스타벅스 리저브" },
      { postID: 5, postTitle: "롯데백화점" },
    ],
  },
];

const AlbumList = () => {
  const [postSelected, setPostSelected] = useState<number>(0);

  return (
    <>
      {albumDummy.map(album => {
        return (
          <AlbumWrapper key={album.albumID}>
            <Header albumName={album.albumName}></Header>
            {album.posts.map(post => (
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
