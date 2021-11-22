import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";

interface AlbumSettingModalProps {
  albumId: number;
  albumName: string;
}

const AlbumSettingModal = ({ albumId, albumName }: AlbumSettingModalProps) => {
  const dispatch = useDispatch();

  const onClickUpdateAlbum = () => {
    dispatch({ type: "SET_SELECTED_ALBUM", payload: { albumId, albumName } });
    dispatch({ type: "OPEN_MODAL", payload: "UpdateAlbumModal" });
  };

  const onClickDeleteAlbum = () => {
    dispatch({ type: "SET_SELECTED_ALBUM", payload: { albumId, albumName } });
    dispatch({ type: "OPEN_MODAL", payload: "DeleteAlbumModal" });
  };

  return (
    <ModalWrapper>
      <ModalItem delete={false} onClick={onClickUpdateAlbum} className="update-album-btn">
        이름 변경
      </ModalItem>
      <Divider />
      <ModalItem delete={true} onClick={onClickDeleteAlbum} className="delete-album-btn">
        앨범 삭제
      </ModalItem>
    </ModalWrapper>
  );
};

const modalSlideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  30% {
    opacity: 1;
    transform: translateY(0);
  }
`;
const ModalWrapper = styled.div`
  width: 110px;
  height: 100px;
  background-color: ${COLOR.WHITE};
  position: absolute;
  border-radius: 1rem;
  z-index: 5;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;
const ModalItem = styled.div<{ delete: boolean }>`
  ${flexRowCenterAlign}
  height: 50%;
  cursor: pointer;
  color: ${(props) => (props.delete ? COLOR.RED : COLOR.BLACK)};
  font-size: 1.6rem;

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
