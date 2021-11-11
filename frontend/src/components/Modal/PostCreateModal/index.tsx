import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../";
import UploadImageModal from "./UploadImageModal";

interface PostCreateModalProps {
  closeFn: () => void;
  open: boolean;
}

const PostCreateModal = ({ closeFn, open = false }: PostCreateModalProps) => {
  return (
    <Modal open={open} closeFn={closeFn}>
      <UploadImageModal closeFn={closeFn} />
    </Modal>
  );
};

export default PostCreateModal;
