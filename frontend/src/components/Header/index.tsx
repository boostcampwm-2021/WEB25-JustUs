import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

import Profile from "@components/Header/Profile";
import Search from "@components/Header/Profile/Search";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isToggle, setIsToggle }: SidebarProps) => {
  const { groups }: any = useSelector((state: RootState) => state.groups);

  const onClickMenu = () => {
    if (!groups.length) return;
    setIsToggle(prev => !prev);
  };
  return (
    <>
      <HeaderContainer groups={groups}>
        <img src="/icons/menu.svg" className="pointer" onClick={onClickMenu} alt="menu" />
        <Search />
        <Profile />
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ groups: any }>`
  height: 5vh;
  background-color: ${COLOR.THEME1.PRIMARY};
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.WHITE};
  padding: 0 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img.pointer {
    &:hover {
      cursor: ${({ groups }) => (groups.length ? "pointer" : "not-allowed")};
    }
  }
`;

export default Header;
