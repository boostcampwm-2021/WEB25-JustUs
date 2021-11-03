import React, { useEffect, Dispatch, SetStateAction } from "react";

import PostCreateModal from "../PostCreateModal";
import CreateGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/CreateGroupModal";
import JoinGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/JoinGroupModal";
import SettingGroupModal from "@components/Sidebar/SecondDepth/SettingGroup/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface Props {
  closeFn: () => void;
  modal: string;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const ModalManager = ({ closeFn, modal = "", setIsToggle }: Props) => {
  const createGroupModalOpened = useSelector((state: RootState) => state.groupModal.createGroupModalOpened);
  const joinGroupModalOpened = useSelector((state: RootState) => state.groupModal.joinGroupModalOpened);
  const settingGroupModalOpened = useSelector((state: RootState) => state.groupModal.settingGroupModalOpened);

  useEffect(() => {}, [createGroupModalOpened, joinGroupModalOpened, settingGroupModalOpened]);

  return (
    <>
      <PostCreateModal closeFn={closeFn} open={modal === "PostCreateModal"} />
      {createGroupModalOpened && <CreateGroupModal closeFn={closeFn} open={true} />}
      {joinGroupModalOpened && <JoinGroupModal closeFn={closeFn} open={true} />}
      {settingGroupModalOpened && <SettingGroupModal closeFn={closeFn} open={true} setIsToggle={setIsToggle} />}
    </>
  );
};

export default ModalManager;
