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
  const clickedTarget = useSelector((state: RootState) => state.groupModal.clickedTarget);
  const addGroupBtnRef = useRef<HTMLDivElement>(null);
  const { selectedGroup } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    const clickHandler = () => {
      if (!clickedTarget.target) return;

      const addgroupButtonEl = clickedTarget.target.closest(".add-group-btn");
      if (addgroupButtonEl !== addGroupBtnRef.current) {
        setIsModalOpened(false);
        return;
      }

      setIsModalOpened(true);
    };

    clickHandler();
  }, [clickedTarget]);

  return (
    <SidebarWrapper>
      <FirstDepth isToggle={isToggle} setIsToggle={setIsToggle} addGroupBtnRef={addGroupBtnRef} />
      {isModalOpened && <AddGroupModal clientX={clickedTarget.clientX} clientY={clickedTarget.clientY} />}
      {isToggle && selectedGroup && <SecondDepth />}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
`;

export default Sidebar;
