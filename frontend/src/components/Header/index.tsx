import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Profile from "@components/Header/Profile";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

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
        <SearchContainer>
          <img src="/icons/search.svg" height="90%" alt="search" />
          <Search type="text" placeholder="해시태그를 입력하세요." />
        </SearchContainer>
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

const SearchContainer = styled.div`
  ${flexRowCenterAlign}
  height: 3vh;
  width: 25vw;
  background-color: ${COLOR.WHITE};
  border-radius: 5px;
  padding: 0.5vh 0;
  & > img {
    padding: 0 0.5vw;
  }
`;

const Search = styled.input`
  height: 90%;
  border: none;
  &:focus-visible {
    outline: none;
  }
`;

export default Header;
