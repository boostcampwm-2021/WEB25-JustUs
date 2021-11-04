import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import COLOR from "@styles/Color";

interface FirstDepthProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const FirstDepth = ({ isToggle, setIsToggle, addGroupBtnRef }: FirstDepthProps) => {
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
  background-color: ${COLOR.THEME1.PRIMARY};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0.5vw 0;

  &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLOR.SCROLL};
    border-radius: 10px;
  }
`;

export default FirstDepth;
