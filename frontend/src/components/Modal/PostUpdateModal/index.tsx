import { useState } from "react";
import Modal from "../";
import UploadImageModal from "../PostCreateModal/UploadImageModal";
import UploadInfoModal from "../PostCreateModal/UploadInfoModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}

const PostUpdateModal = () => {
  const [mode, setMode] = useState<string>("image");
  const { selectedPost }: any = useSelector((state: RootState) => state.modal);
  const [files, setFiles] = useState<FileObject[]>(selectedPost.postImages);
  const prevLocation = {
    place_name: selectedPost.postLocation,
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
