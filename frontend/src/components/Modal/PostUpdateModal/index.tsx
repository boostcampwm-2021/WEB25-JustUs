import { useEffect, useState } from "react";
import Modal from "../";
import UploadImageModal from "../PostCreateModal/UploadImageModal";
import UploadInfoModal from "../PostCreateModal/UploadInfoModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}
interface IPost {
  userId: number;
  userNickname: string;
  postId: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  images: Array<{ imageUrl: string; imageId: string }>;
  postLatitude: number;
  postLongitude: number;
  postLocation: string;
}

const PostUpdateModal = () => {
  const [mode, setMode] = useState<string>("image");
  const { selectedPost }: { selectedPost: IPost } = useSelector((state: RootState) => state.modal);
  const [files, setFiles] = useState<FileObject[]>(selectedPost.images);
  const prevLocation = {
    placeName: selectedPost.postLocation,
    x: selectedPost.postLongitude,
    y: selectedPost.postLatitude,
  };
  const changeMode = () => {
    if (mode === "image") setMode("info");
    else setMode("image");
  };

  return (
    <Modal>
      {mode === "image" ? (
        <UploadImageModal files={files} setFiles={setFiles} changeMode={changeMode} />
      ) : (
        <UploadInfoModal
          mode="update"
          files={files}
          changeMode={changeMode}
          prevTitle={selectedPost.postTitle}
          prevText={selectedPost.postContent}
          prevDate={selectedPost.postDate}
          prevLocation={prevLocation}
        />
      )}
    </Modal>
  );
};

export default PostUpdateModal;
