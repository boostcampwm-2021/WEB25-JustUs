import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Group from "./Group";
import AddGroupButton from "./AddGroupButton";
import color from "@styles/Color";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
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

const FirstDepth = ({ isToggle, setIsToggle }: SidebarProps) => {
  const onClickMenu = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <>
      <FirstDepthWrapper>
        {groupDummy.map(group => (
          <Group key={group.groupID} groupName={group.groupName} />
        ))}
        <AddGroupButton />
      </FirstDepthWrapper>
    </>
  );
};

const FirstDepthWrapper = styled.div`
  width: 5vw;
  height: 95vh;
  background-color: ${color.theme1.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default FirstDepth;
