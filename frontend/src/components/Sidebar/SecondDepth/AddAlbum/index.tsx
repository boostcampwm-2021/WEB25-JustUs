import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";
import { ReactComponent as AddAlbumSVG } from "@styles/icons/add-album.svg";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface AddAlbumProps {
  addAlbumBtnRef: React.RefObject<HTMLDivElement>;
}

const AddAlbum = ({ addAlbumBtnRef }: AddAlbumProps) => {
  const { nowTheme }: any = useSelector((state: RootState) => state.theme);
  const onClickAddAlbum = () => {};

  return (
    <AddAlbumWrapper>
      <AddAblumBtnWrapper onClick={onClickAddAlbum} className="add-album-btn" ref={addAlbumBtnRef}>
        <AddAlbumSVG fill={nowTheme.MENUTEXT} />
        <GuideWrapper>Add Album</GuideWrapper>
      </AddAblumBtnWrapper>
    </AddAlbumWrapper>
  );
};

const AddAlbumWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 90%;
  height: 100px;
  position: absolute;
  bottom: 0;
`;

const AddAblumBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  height: 5vh;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.SECONDARY};
  width: 100%;
  background: ${COLOR.BLUR};
  color: ${(props) => props.theme.MENUTEXT};
  cursor: pointer;
`;

const GuideWrapper = styled.div`
  margin-left: 10px;
`;

export default AddAlbum;
