import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { ModalAction } from "@src/action";
import { modal } from "@src/constants";

interface AlbumSettingModalProps {
  albumId: number;
  albumName: string;
  x: number;
  y: number;
}

const AlbumSettingModal = ({ albumId, albumName, x, y }: AlbumSettingModalProps) => {
  const dispatch = useDispatch();

  const onClickUpdateAlbum = () => {
    dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
    dispatch(ModalAction.setSelectedAlbumAction({ albumId, albumName }));
    dispatch(ModalAction.openModalAction(modal.UpdateAlbumModal));
  };

  const onClickDeleteAlbum = () => {
    dispatch(ModalAction.setAlbumSettingWrapperModalIdxAction({ albumSettingWrapperModalIdx: -1 }));
    dispatch(ModalAction.setSelectedAlbumAction({ albumId, albumName }));
    dispatch(ModalAction.openModalAction(modal.DeleteAlbumModal));
  };

  return (
    <ModalWrapper x={x} y={y}>
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
const ModalWrapper = styled.div<{ x: number; y: number }>`
  width: 110px;
  height: 100px;
  background-color: ${COLOR.WHITE};
  position: fixed;
  left: ${(props) => `${props.x}px`};
  top: ${(props) => `${props.y}px`};
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
