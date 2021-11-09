import { useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { useDispatch } from "react-redux";
import { GroupAction } from "@src/action";

interface InputModalProps {
  addAlbumModalRef: React.RefObject<HTMLDivElement>;
  setIsAddAlbumModalOpened: Dispatch<SetStateAction<boolean>>;
}

const InputModal = ({ addAlbumModalRef, setIsAddAlbumModalOpened }: InputModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { groups, selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const dispatch = useDispatch();

  const onClickAddAlbum = () => {
    if (!inputRef.current) return;

    const albumName = inputRef.current.value;
    const selectedGroupID = selectedGroup.groupID;
    const selectedAlbumList = groups[selectedGroupID].albumList;
    const albumID = selectedAlbumList[selectedAlbumList.length - 1].albumID + 1;

    const newAlbum = {
      albumID,
      albumName,
      posts: [],
    };

    selectedAlbumList.push(newAlbum);

    dispatch({ type: GroupAction.SET_ALL_GROUPS, payload: groups });
    setIsAddAlbumModalOpened(false);
  };

  return (
    <AddAlbumModalWrapper ref={addAlbumModalRef} className="add-album-modal">
      <AlbumCreateInputWrapper placeholder="새 앨범" ref={inputRef} />
      <AlbumCreateBtnWrapper onClick={onClickAddAlbum}>생성</AlbumCreateBtnWrapper>
    </AddAlbumModalWrapper>
  );
};

const AddAlbumModalWrapper = styled.div`
  ${flexRowCenterAlign}
  width: 90%;
  height: 7vh;
  background-color: ${COLOR.WHITE};
  position: absolute;
  bottom: 10vh;
  border-radius: 20px;
  justify-content: space-around;
`;

const AlbumCreateInputWrapper = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.PRIMARY};
  width: 60%;
  text-align: center;
  font-size: 1rem;

  &::-webkit-input-placeholder {
    text-align: center;
    font-size: 1.2rem;
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
  cursor: pointer;
`;

export default InputModal;
