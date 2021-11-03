import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";
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
        <img src="/icons/menu.svg" onClick={onClickMenu} alt="menu" />
        <SearchContainer>
          <img src="/icons/search.svg" height="90%" alt="search" />
          <Search type="text" placeholder="해시태그를 입력하세요." />
        </SearchContainer>
        <ProfileContainer>
          <img src="/icons/profile.svg" height="90%" alt="profile" />
        </ProfileContainer>
      </HeaderContainer>
    </>
  );
};

const HeaderContainer = styled.div<{ groups: any }>`
  height: 5vh;
  background-color: ${Color["theme1-primary"]};
  border-bottom: 1px solid ${Color.white};
  padding: 0 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    &:hover {
      cursor: ${({ groups }) => (groups.length ? "pointer" : "not-allowed")};
    }
  }
`;

const SearchContainer = styled.div`
  ${flexCenterAlign}
  height: 3vh;
  width: 25vw;
  background-color: ${Color.white};
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

const ProfileContainer = styled.div`
  ${flexCenterAlign}
  height: 4vh;
  width: 4vh;
  background-color: ${Color.white};
  border-radius: 10px;
`;

export default Header;
