import { useState, ChangeEvent, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  smallModalContainer,
  smallModalHeader,
  smallModalTitle,
  smallModalCloseButton,
  smallModalContent,
  smallButton,
  smallModalInputWrapper,
} from "@styles/StyledComponents";
import Modal from "@components/Modal";
import { useDispatch } from "react-redux";
import COLOR from "@styles/Color";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction, ModalAction } from "@src/action";
import { icon } from "@src/constants";

const UpdateAlbumModal = () => {
  const dispatch = useDispatch();
  const { selectedAlbum } = useSelector((state: RootState) => state.modal);
  const originAlbumName = selectedAlbum.albumName;
  const [newAlbumName, setNewAlbumName] = useState(originAlbumName);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    dispatch(ModalAction.closeModalAction());
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewAlbumName(e.target.value);
  };

  const onClickSave = () => {
    if (newAlbumName === originAlbumName) {
      closeModal();
      return;
    }
    const albumId = selectedAlbum.albumId;
    dispatch(GroupAction.updateAlbumRequestAction(newAlbumName, albumId));
    closeModal();
  };

  useEffect(() => {
    (inputRef.current as HTMLInputElement).focus();
  }, []);

  return (
    <Modal>
      <ModalContainer
        onClick={(event) => {
          event.nativeEvent.stopImmediatePropagation();
        }}
      >
        <Header>
          <Title>앨범 이름 변경</Title>
          <CloseButton type="button" onClick={closeModal}>
            <img src={icon.clear} alt="clear icon" />
          </CloseButton>
        </Header>
        <Content>
          <AlbumNameInputWrapper onChange={onChangeName} value={newAlbumName} spellCheck={false} ref={inputRef} />
          <SaveBtnWrapper onClick={onClickSave}>저장하기</SaveBtnWrapper>
        </Content>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  ${smallModalContainer}
`;
const Header = styled.div`
  ${smallModalHeader}
`;
const Title = styled.div`
  ${smallModalTitle}
`;
const CloseButton = styled.button`
  ${smallModalCloseButton}
`;
const Content = styled.div`
  margin-top: 2rem;
  ${smallModalContent}
`;
const AlbumNameInputWrapper = styled.input`
  ${smallModalInputWrapper}
`;
const SaveBtnWrapper = styled.button`
  ${smallButton}
  background-color: ${(props) => props.theme.PRIMARY};
  margin: auto;
  color: ${COLOR.WHITE};
`;

export default UpdateAlbumModal;
