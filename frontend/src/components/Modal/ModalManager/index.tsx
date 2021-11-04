import { Dispatch, SetStateAction } from "react";
import PostCreateModal from "../PostCreateModal";
import CreateGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/CreateGroupModal";
import JoinGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/JoinGroupModal";
import SettingGroupModal from "@components/Sidebar/SecondDepth/SettingGroup/Modal";
import ProfileModal from "@components/Header/Profile/Modal/InnerModal/UserInfoModal";
import ThemeModal from "@components/Header/Profile/Modal/InnerModal/ThemeModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import CloseModal from "../CloseModal";

interface ModalManagerProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const ModalManager = ({ setIsToggle }: ModalManagerProps) => {
  const { nowModal } = useSelector((state: RootState) => state.uploadModal);

  return (
    <>
      {nowModal === "" && <CloseModal />}
      {nowModal === "PostCreateModal" && <PostCreateModal />}
      {nowModal === "CreateGroupModal" && <CreateGroupModal />}
      {nowModal === "JoinGroupModal" && <JoinGroupModal />}
      {nowModal === "SettingGroupModal" && <SettingGroupModal setIsToggle={setIsToggle} />}
      {nowModal === "ProfileModal" && <ProfileModal />}
      {nowModal === "ThemeModal" && <ThemeModal />}
    </>
  );
};

export default ModalManager;
