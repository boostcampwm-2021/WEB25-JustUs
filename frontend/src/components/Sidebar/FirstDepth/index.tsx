import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import Color from "@styles/Color";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const groupDummy = [
  {
    groupID: 0,
    groupName: "그룹 A",
    img: "",
  },
  {
    groupID: 1,
    groupName: "그룹 B",
    img: "",
  },
  {
    groupID: 2,
    groupName: "그룹 C",
    img: "",
  },
];

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: SidebarProps) => {
  const { groups } = useSelector((state: RootState) => state.groups);

  const onClickMenu = () => {
    setIsToggle(prev => !prev);
  };

  useEffect(() => {}, [groups]);

  return (
    <>
      <FirstDepthWrapper>
        {groups.map(group => (
          <Group key={group.groupID} groupName={group.groupName} />
        ))}
        <AddGroupButton addGroupBtnRef={addGroupBtnRef} />
      </FirstDepthWrapper>
    </>
  );
};

const FirstDepthWrapper = styled.div`
  width: 5vw;
  height: 95vh;
  background-color: ${Color["theme1-primary"]};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${Color.scroll};
    border-radius: 10px;
  }
`;

export default FirstDepth;
