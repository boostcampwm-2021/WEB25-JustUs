import styled from "styled-components";
import Color from "@styles/Color";

interface HeaderProps {
  albumName: string;
}

const Header = ({ albumName }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <img src="/icons/arrow-down.svg" alt="arrow-down icon.svg" />
      {albumName}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  color: ${Color.white};
  display: flex;
`;

export default Header;
