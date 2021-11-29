import styled, { css } from "styled-components";
import { flexRowCenterAlign, iconHover } from "@src/styles/StyledComponents";
import COLOR from "@src/styles/Color";
import { useDispatch } from "react-redux";
import { ModalAction } from "@src/action";
import { icon, modal } from "@src/constants";
const PostSettingModal = () => {
  const dispatch = useDispatch();
  const onClickUpdatePost = () => {
    dispatch(ModalAction.openModalAction(modal.PostUpdateModal));
  };

  const onClickDeletePost = () => {
    dispatch(ModalAction.openModalAction(modal.PostDeleteModal));
  };

  return (
    <ModalWrapper>
      <ModalItem delete={false} onClick={onClickUpdatePost} className="update-post-btn">
        <img src={icon.update} alt="update icon" />
      </ModalItem>
      <ModalItem delete={true} onClick={onClickDeletePost} className="delete-delete-btn">
        <img src={icon.trash} alt="trash icon" />
      </ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 10rem;
  display: flex;
  height: 7rem;
  justify-content: space-around;
  align-items: center;
  background-color: ${COLOR.WHITE};
  position: absolute;
  right: -10rem;
  padding-left: 1rem;
  border-radius: 0 1rem 1rem 0;
  z-index: -1;
`;
const ModalItem = styled.div<{ delete: boolean }>`
  ${flexRowCenterAlign}
  height: 50%;

  & > img {
    ${iconHover}
  }
`;

export default PostSettingModal;
