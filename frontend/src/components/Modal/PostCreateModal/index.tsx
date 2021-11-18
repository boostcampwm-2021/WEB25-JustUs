import React, { useState } from "react";
import Modal from "../";
import UploadImageModal from "./UploadImageModal";
import UploadInfoModal from "./UploadInfoModal";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}

const PostCreateModal = () => {
  const [mode, setMode] = useState<string>("image");
  const [files, setFiles] = useState<FileObject[]>([]);
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
          mode="create"
          files={files}
          changeMode={changeMode}
          prevTitle=""
          prevText=""
          prevLocation={{}}
          prevDate=""
        />
      )}
    </Modal>
  );
};

export default PostCreateModal;
