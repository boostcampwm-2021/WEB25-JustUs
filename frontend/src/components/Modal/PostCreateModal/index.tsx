import React, { useState } from "react";
import Modal from "../";
import UploadImageModal from "./UploadImageModal";
import UploadInfoModal from "./UploadInfoModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface FileObject {
  imageUrl: File | string;
  imageId: string;
}

const PostCreateModal = () => {
  const [mode, setMode] = useState<string>("image");
  const [files, setFiles] = useState<FileObject[]>([]);
  const { address, position }: { address: string; position: { x: number; y: number } } = useSelector(
    (state: RootState) => state.address,
  );
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
          prevLocation={{
            placeName: address ? address : "",
            x: position ? position.x : -1,
            y: position ? position.y : -1,
          }}
          prevDate=""
        />
      )}
    </Modal>
  );
};

export default PostCreateModal;
