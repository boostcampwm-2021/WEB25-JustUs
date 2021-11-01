import React from "react";

import PostCreateModal from "../PostCreateModal";

interface Props {
  closeFn: (event: React.SyntheticEvent<EventTarget>) => null;
  modal: string;
}

const ModalManager = ({ closeFn, modal = "" }: Props) => {
  return <PostCreateModal closeFn={closeFn} open={modal === "PostCreateModal"} />;
};

export default ModalManager;
