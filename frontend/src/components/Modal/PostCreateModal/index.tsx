import React, { useState } from "react";
import Modal from "../";
import UploadImageModal from "./UploadImageModal";
import UploadInfoModal from "./UploadInfoModal";

interface PostCreateModalProps {
  closeFn: () => void;
  open: boolean;
}
interface FileObject {
  FILE: File;
  KEY: string;
}

const PostCreateModal = ({ closeFn, open = false }: PostCreateModalProps) => {
  const [mode, setMode] = useState<string>("image");
  const [files, setFiles] = useState<FileObject[]>([]);
  const changeMode = () => {
    if (mode === "image") setMode("info");
    else setMode("image");
  };

  return (
    <Modal open={open} closeFn={closeFn}>
      {mode === "image" ? (
        <UploadImageModal files={files} setFiles={setFiles} changeMode={changeMode} closeFn={closeFn} />
      ) : (
        <UploadInfoModal files={files} changeMode={changeMode} closeFn={closeFn} />
      )}
    </Modal>
  );
};

export default PostCreateModal;
