import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";

const AlbumSettingModal = () => {
  const onClickUpdateAlbum = () => {};
  const onClickDeleteAlbum = () => {};

  return (
    <ModalWrapper>
      <ModalItem delete={false} onClick={onClickUpdateAlbum}>
        앨범 이름 변경
      </ModalItem>
      <Divider />
      <ModalItem delete={true} onClick={onClickDeleteAlbum}>
        앨범 삭제
      </ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 150px;
  height: 100px;
  background-color: ${COLOR.WHITE};
  position: absolute;
  border-radius: 10px;
  z-index: 5;
`;
const ModalItem = styled.div<{ delete: boolean }>`
  ${flexRowCenterAlign}
  height: 50%;
  cursor: pointer;
  color: ${(props) => (props.delete ? "red" : "black")};
  &:hover {
    opacity: 0.5;
  }
`;
const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLOR.BLACK};
`;

export default AlbumSettingModal;
