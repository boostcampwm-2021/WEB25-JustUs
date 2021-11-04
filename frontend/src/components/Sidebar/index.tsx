import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import FirstDepth from "./FirstDepth";
import SecondDepth from "./SecondDepth";
import AddGroupModal from "@components/Sidebar/FirstDepth/AddGroupButton/Modal/AddGroupModal";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isToggle, setIsToggle }: SidebarProps) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [isAddAlbumModalOpened, setIsAddAlbumModalOpened] = useState<boolean>(false);
  const addGroupBtnRef = useRef<HTMLDivElement>(null);
  const addAlbumBtnRef = useRef<HTMLDivElement>(null);
  const addAlbumModalRef = useRef<HTMLDivElement>(null);
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);
  const { selectedGroup } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.target) return;

      const addgroupButtonEl = clickedTarget.target.closest(".add-group-btn");
      const addAlbumButtonEl = clickedTarget.target.closest(".add-album-btn");
      const addAlbumModalEl = clickedTarget.target.closest(".add-album-modal");

      if (addgroupButtonEl !== addGroupBtnRef.current && addgroupButtonEl !== addGroupBtnRef.current) {
        setIsModalOpened(false);
      }

      if (
        addAlbumButtonEl !== addGroupBtnRef.current &&
        addAlbumButtonEl !== addAlbumBtnRef.current &&
        addAlbumModalEl !== addAlbumModalRef.current
      ) {
        setIsAddAlbumModalOpened(false);
      }

      if (addgroupButtonEl) setIsModalOpened(true);
      if (addAlbumButtonEl) setIsAddAlbumModalOpened(true);
    };

    clickHandler();
  }, [clickedTarget]);

  return (
    <SidebarWrapper>
      <FirstDepth isToggle={isToggle} setIsToggle={setIsToggle} addGroupBtnRef={addGroupBtnRef} />
      {isToggle && selectedGroup && (
        <SecondDepth
          addAlbumBtnRef={addAlbumBtnRef}
          isAddAlbumModalOpened={isAddAlbumModalOpened}
          setIsAddAlbumModalOpened={setIsAddAlbumModalOpened}
          addAlbumModalRef={addAlbumModalRef}
        />
      )}
      {isModalOpened && <AddGroupModal clientX={clickedTarget.clientX} clientY={clickedTarget.clientY} />}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
`;

export default Sidebar;
