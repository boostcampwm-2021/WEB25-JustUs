import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import styled from "styled-components";
import FirstDepth from "./FirstDepth";
import SecondDepth from "./SecondDepth";
interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ isToggle, setIsToggle }: SidebarProps) => {
  const addGroupBtnRef = useRef<HTMLDivElement>(null);

  return (
    <SidebarWrapper>
      <FirstDepth isToggle={isToggle} setIsToggle={setIsToggle} addGroupBtnRef={addGroupBtnRef} />
      <SecondDepth isToggle={isToggle} />
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.nav`
  display: inline-flex;
  font-size: 1.6rem;
  width: 29rem;
`;

export default Sidebar;
