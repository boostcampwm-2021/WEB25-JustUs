import { useState } from "react";
import Header from "@components/Sidebar/SecondDepth/AlbumList/Header";
import Post from "@components/Sidebar/SecondDepth/AlbumList/Post";

interface AlbumProps {
  albumIdx: number;
  album: any;
  postSelected: number;
  setPostSelected: React.Dispatch<React.SetStateAction<number>>;
  modalOpenedIdx: number;
  setModalOpenedIdx: React.Dispatch<React.SetStateAction<number>>;
  AlbumDragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  PostDragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  DragLeaveHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  DropHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  PostDragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  AlbumDragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
}

const Album = ({
  albumIdx,
  album,
  postSelected,
  setPostSelected,
  modalOpenedIdx,
  setModalOpenedIdx,
  AlbumDragEndHandler,
  PostDragEndHandler,
  DropHandler,
  PostDragHandler,
  AlbumDragHandler,
  DragLeaveHandler,
}: AlbumProps) => {
  const [postToggle, setPostToggle] = useState(true);

  return (
    <div onDrop={DropHandler} onDragLeave={DragLeaveHandler} onDragOver={(e) => e.preventDefault()}>
      <Header
        albumID={album.albumID}
        albumName={album.albumName}
        postToggle={postToggle}
        setPostToggle={setPostToggle}
        modalOpenedIdx={modalOpenedIdx}
        setModalOpenedIdx={setModalOpenedIdx}
        AlbumDragHandler={AlbumDragHandler}
        DragEndHandler={AlbumDragEndHandler}
      ></Header>
      {postToggle &&
        album.posts.map((post: any) => (
          <Post
            key={post.postId}
            idx={post.postId}
            postSelected={postSelected}
            postTitle={post.postTitle}
            setPostSelected={setPostSelected}
            PostDragHandler={PostDragHandler}
            PostDragEndHandler={PostDragEndHandler}
            albumIdx={albumIdx}
          />
        ))}
    </div>
  );
};

export default Album;
