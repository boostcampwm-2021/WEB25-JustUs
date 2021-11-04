import styled from "styled-components";
import COLOR from "@styles/Color";

interface HeaderProps {
  albumName: string;
  postToggle: boolean;
  setPostToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ albumName, postToggle, setPostToggle }: HeaderProps) => {
  const onClickArrowDown = () => {
    setPostToggle(prev => !prev);
  };

  return (
    <HeaderWrapper>
      <ArrowIcon onClick={onClickArrowDown}>
        {postToggle && <img src="/icons/arrow-down.svg" alt="arrow-down icon.svg" />}
        {!postToggle && <img src="/icons/arrow-right.svg" alt="arrow-right icon.svg" />}
      </ArrowIcon>
      {albumName}
      <MoreIcon>{albumName !== "기본 앨범" && <img src="/icons/more-vert.svg" alt="more-vert icon.svg" />}</MoreIcon>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  width: 100%;
  color: ${COLOR.WHITE};
  display: grid;
  grid-template-columns: 10% 80% 10%;
  cursor: default;
`;

const ArrowIcon = styled.div`
  cursor: pointer;
`;

const MoreIcon = styled.div`
  cursor: pointer;
`;

export default Header;
