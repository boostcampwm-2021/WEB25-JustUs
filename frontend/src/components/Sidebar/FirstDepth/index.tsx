import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import Color from "@styles/Color";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  clickedTarget: { element: HTMLElement };
}

const groupDummy = [
  {
    groupName: "그룹 A",
    img: "",
  },
  {
    groupName: "그룹 B",
    img: "",
  },
  {
    groupName: "그룹 C",
    img: "",
  },
];

const FirstDepth = ({ isToggle, setIsToggle, clickedTarget }: SidebarProps) => {
  const onClickMenu = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <>
      <FirstDepthWrapper>
        {groupDummy.map(group => (
          <Group groupName={group.groupName} />
        ))}
        <AddGroupButton clickedTarget={clickedTarget} />
        <div>
          <img src="/icons/menu.svg" onClick={onClickMenu} alt="menu icon.svg" />
        </div>
      </FirstDepthWrapper>
    </>
  );
};

const FirstDepthWrapper = styled.div`
  width: 5vw;
  height: 100vh;
  background-color: ${Color["theme1-primary"]};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FirstDepth;
