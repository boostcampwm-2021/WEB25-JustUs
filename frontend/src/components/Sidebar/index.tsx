import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import FirstDepth from "./FirstDepth";
import SecondDepth from "./SecondDepth";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isToggle, setIsToggle }: SidebarProps) => {
  return (
    <SidebarWrapper>
      <FirstDepth isToggle={isToggle} setIsToggle={setIsToggle} />
      {isToggle && <SecondDepth />}
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
`;

export default Sidebar;
