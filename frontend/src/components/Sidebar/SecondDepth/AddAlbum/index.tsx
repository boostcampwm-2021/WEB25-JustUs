import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";

interface AddAlbumProps {
  addAlbumBtnRef: React.RefObject<HTMLDivElement>;
}

const AddAlbum = ({ addAlbumBtnRef }: AddAlbumProps) => {
  const onClickAddAlbum = () => {};

  return (
    <AddAlbumWrapper>
      <AddAblumBtnWrapper onClick={onClickAddAlbum} className="add-album-btn" ref={addAlbumBtnRef}>
        <img src="/icons/add-album.svg" alt="add-album icon.svg" />
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
  border: 1px solid ${COLOR.WHITE};
  width: 100%;
  background: ${COLOR.BLUR};
  color: ${COLOR.WHITE};
  cursor: pointer;
`;

const GuideWrapper = styled.div`
  margin-left: 10px;
`;

export default AddAlbum;
