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

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: SidebarProps) => {
  const { groups }: any = useSelector((state: RootState) => state.groups);

  const onClickMenu = () => {
    setIsToggle(prev => !prev);
  };

  useEffect(() => {}, [groups]);

  return (
    <>
      <FirstDepthWrapper>
        {groups.map((group: any) => (
          <Group
            key={group.groupID}
            groupID={group.groupID}
            groupName={group.groupName}
            groupImg={group.groupImg}
            albumList={group.albumList}
            setIsToggle={setIsToggle}
          />
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
