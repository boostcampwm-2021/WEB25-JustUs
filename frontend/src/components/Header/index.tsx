import styled from "styled-components";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import Profile from "@components/Header/Profile";
import Search from "@components/Header/Profile/Search";
import Logo from "@components/Header/Logo";
const Header = () => {
  const { groups }: any = useSelector((state: RootState) => state.groups);
  return (
    <HeaderContainer groups={groups}>
      <Logo />
      {groups.length > 0 ? <Search /> : <div />}
      <Profile />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div<{ groups: any }>`
  height: 5vh;
  background-color: ${(props) => props.theme.PRIMARY};
  box-sizing: border-box;
  border-bottom: 1px solid ${COLOR.WHITE};
  padding: 0 1vw;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 30rem 1fr 30rem;
  & img.pointer {
    &:hover {
      cursor: ${({ groups }) => (groups.length ? "pointer" : "not-allowed")};
    }
  }
`;

export default Header;
