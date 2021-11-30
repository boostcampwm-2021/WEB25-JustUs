import { useRef, Dispatch, SetStateAction, useState, ChangeEvent, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useDispatch } from "react-redux";
import { GroupAction, ModalAction } from "@src/action";

const InputModal = () => {
  const [albumName, setAlbumName] = useState("");
  const [addAlbum, setAddAlbum] = useState(true);
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const { clickedTarget }: any = useSelector((state: RootState) => state.groupModal);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (inputRef.current as HTMLElement).focus();
  }, []);

  useEffect(() => {
    if (addAlbum) {
      setAlbumName("");
    }
  }, [addAlbum]);

  const onClickAddAlbum = () => {
    if (!albumName) return;
    const selectedGroupId = selectedGroup.groupId;

    dispatch(GroupAction.newAlbumRequestAction(albumName, selectedGroupId));
    setAddAlbum(true);
    dispatch(ModalAction.setAddAlbumModalOpened({ isAddAlbumModalOpened: false }));
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setAlbumName(e.target.value);
    setAddAlbum(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") onClickAddAlbum();
  };

  return (
    <AddAlbumModalWrapper className="add-album-modal">
      <AlbumCreateInputWrapper
        placeholder="새 앨범"
        onChange={onChangeName}
        spellCheck={false}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <AlbumCreateBtnWrapper onClick={onClickAddAlbum}>생성</AlbumCreateBtnWrapper>
    </AddAlbumModalWrapper>
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
const AddAlbumModalWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 90%;
  margin: 5%;
  height: 7vh;
  background-color: ${COLOR.WHITE};
  position: absolute;
  bottom: 10vh;
  border-radius: 20px;
  justify-content: space-around;
  animation-name: ${modalSlideUp};
  animation-duration: 1s;
`;

const AlbumCreateInputWrapper = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.PRIMARY};
  width: 60%;
  text-align: center;

  &::-webkit-input-placeholder {
    text-align: center;
    font-size: 1.6rem;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus {
    &::-webkit-input-placeholder {
      color: transparent;
    }
  }
`;

const AlbumCreateBtnWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 3vw;
  height: 5vh;
  background-color: ${(props) => props.theme.SECONDARY};
  color: ${COLOR.WHITE};
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.PRIMARY};
  }
  &:active {
    font-weight: bold;
  }
`;

export default InputModal;
