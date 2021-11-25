import React, { useState } from "react";
import Modal from "../";
import UploadImageModal from "./UploadImageModal";
import UploadInfoModal from "./UploadInfoModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useResizeFile } from "@src/hooks/useResizeFile";

const PostCreateModal = () => {
  const [mode, setMode] = useState<string>("image");
  const { files, addFile, removeFile } = useResizeFile();
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
        <UploadImageModal files={files} addFile={addFile} removeFile={removeFile} changeMode={changeMode} />
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
