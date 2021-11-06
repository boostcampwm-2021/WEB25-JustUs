import { useState } from "react";
import Header from "@components/Sidebar/SecondDepth/AlbumList/Header";
import Post from "@components/Sidebar/SecondDepth/AlbumList/Post";

interface AlbumProps {
  album: any;
  postSelected: number;
  setPostSelected: React.Dispatch<React.SetStateAction<number>>;
  modalOpenedIdx: number;
  setModalOpenedIdx: React.Dispatch<React.SetStateAction<number>>;
}

const Album = ({ album, postSelected, setPostSelected, modalOpenedIdx, setModalOpenedIdx }: AlbumProps) => {
  const [postToggle, setPostToggle] = useState(true);

  return (
    <>
      <Header
        albumID={album.albumID}
        albumName={album.albumName}
        postToggle={postToggle}
        setPostToggle={setPostToggle}
        modalOpenedIdx={modalOpenedIdx}
        setModalOpenedIdx={setModalOpenedIdx}
      ></Header>
      {postToggle &&
        album.posts.map((post: any) => (
          <Post
            key={post.postID}
            idx={post.postID}
            postSelected={postSelected}
            postTitle={post.postTitle}
            setPostSelected={setPostSelected}
          />
        ))}
    </>
  );
};

export default Album;
