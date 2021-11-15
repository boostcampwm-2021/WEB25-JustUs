import { Dispatch, SetStateAction } from "react";
import PostCreateModal from "../PostCreateModal";
import PostShowModal from "../PostShowModal";
import CreateGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/CreateGroupModal";
import JoinGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/InnerModal/JoinGroupModal";
import SettingGroupModal from "@components/Sidebar/SecondDepth/SettingGroup/Modal";
import ProfileModal from "@components/Header/Profile/Modal/InnerModal/UserInfoModal";
import ThemeModal from "@components/Header/Profile/Modal/InnerModal/ThemeModal";
import UpdateAlbumModal from "@components/Sidebar/SecondDepth/AlbumList/Header/Modal/InnerModal/UpdateAlbumModal";
import DeleteAlbumModal from "@components/Sidebar/SecondDepth/AlbumList/Header/Modal/InnerModal/DeleteAlbumModal";
import AddGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/";
import PostDeleteModal from "@components/Modal/PostDeleteModal";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import CloseModal from "../CloseModal";

interface ModalManagerProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const ModalManager = ({ setIsToggle }: ModalManagerProps) => {
  const { nowModal } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {nowModal === "" && <CloseModal />}
      {nowModal === "PostCreateModal" && <PostCreateModal />}
      {nowModal === "PostShowModal" && <PostShowModal />}
      {nowModal === "CreateGroupModal" && <CreateGroupModal />}
      {nowModal === "JoinGroupModal" && <JoinGroupModal />}
      {nowModal === "SettingGroupModal" && <SettingGroupModal setIsToggle={setIsToggle} />}
      {nowModal === "ProfileModal" && <ProfileModal />}
      {nowModal === "ThemeModal" && <ThemeModal />}
      {nowModal === "UpdateAlbumModal" && <UpdateAlbumModal />}
      {nowModal === "DeleteAlbumModal" && <DeleteAlbumModal />}
      {nowModal === "AddGroupModal" && <AddGroupModal />}
      {nowModal === "PostDeleteModal" && <PostDeleteModal />}
    </>
  );
};

export default ModalManager;
