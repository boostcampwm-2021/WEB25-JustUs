import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@styles/Color";

const AddAlbum = () => {
  return (
    <AddAlbumWrapper>
      <AddAblumBtnWrapper>
        <img src="/icons/add-album.svg" alt="add-album icon.svg" />
        <GuideWrapper>Add Album</GuideWrapper>
      </AddAblumBtnWrapper>
    </AddAlbumWrapper>
  );
};

const AddAlbumWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 15vw;
  height: 100px;
  position: absolute;
  bottom: 0;
`;

const AddAblumBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  height: 5vh;
  border-radius: 10px;
  border: 1px solid ${COLOR.WHITE};
  width: 85%;
  background: ${COLOR.BLUR};
  color: ${COLOR.WHITE};
`;

const GuideWrapper = styled.div`
  margin-left: 10px;
`;

export default AddAlbum;
