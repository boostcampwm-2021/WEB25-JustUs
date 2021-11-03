import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import color from "@styles/Color";

interface SidebarProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}

const Header = ({ isToggle, setIsToggle }: SidebarProps) => {
  const onClickMenu = () => {
    setIsToggle(prev => !prev);
  };

  return (
    <>
      <HeaderContainer>
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

const HeaderContainer = styled.div`
  height: 5vh;
  background-color: ${color.theme1.primary};
  border-bottom: 1px solid ${color.white};
  padding: 0 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & img {
    &:hover {
      cursor: pointer;
    }
  }
`;

const SearchContainer = styled.div`
  height: 3vh;
  width: 25vw;
  background-color: ${color.white};
  border-radius: 5px;
  display: flex;
  padding: 0.5vh 0;
  justify-content: start;
  align-items: center;
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
  height: 4vh;
  width: 4vh;
  background-color: ${color.white};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;
