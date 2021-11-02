import React, { useEffect } from "react";

import PostCreateModal from "../PostCreateModal";
import CreateGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/CreateGroupModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface Props {
  closeFn: () => void;
  modal: string;
}

const ModalManager = ({ closeFn, modal = "" }: Props) => {
  const createGroupModalOpened = useSelector((state: RootState) => state.groupModal.createGroupModalOpened);
  const joinGroupModalOpened = useSelector((state: RootState) => state.groupModal.joinGroupModalOpened);

  useEffect(() => {}, [createGroupModalOpened, joinGroupModalOpened]);

  return (
    <>
      <PostCreateModal closeFn={closeFn} open={modal === "PostCreateModal"} />
      {createGroupModalOpened && <CreateGroupModal closeFn={closeFn} open={true} />}
    </>
  );
};

export default ModalManager;
