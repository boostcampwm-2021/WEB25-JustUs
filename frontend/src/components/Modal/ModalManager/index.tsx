import React from "react";
import PostCreateModal from "../PostCreateModal";
import CreateGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/CreateGroupModal";
import JoinGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/JoinGroupModal";
import SettingGroupModal from "@components/Sidebar/SecondDepth/SettingGroup/Modal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import CloseModal from "../CloseModal";

const ModalManager = () => {
  const { nowModal } = useSelector((state: RootState) => state.uploadModal);

  return (
    <>
      {nowModal === "" && <CloseModal />}
      {nowModal === "PostCreateModal" && <PostCreateModal />}
      {nowModal === "CreateGroupModal" && <CreateGroupModal />}
      {nowModal === "JoinGroupModal" && <JoinGroupModal />}
      {nowModal === "SettingGroupModal" && <SettingGroupModal />}
    </>
  );
};

export default ModalManager;
