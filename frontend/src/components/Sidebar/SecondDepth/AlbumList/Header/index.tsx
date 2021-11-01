import styled from "styled-components";
import Color from "@components/Styles/Color";

interface HeaderProps {
  albumName: string;
}

const Header = ({ albumName }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <img src="/icons/arrow-down.svg" alt="arrow-down.svg" />
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
