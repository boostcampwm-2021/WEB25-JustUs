import styled from "styled-components";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import COLOR from "@src/styles/Color";
import { useDispatch } from "react-redux";
const PostSettingModal = () => {
  const dispatch = useDispatch();
  const onClickUpdatePost = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostUpdateModal" });
  };

  const onClickDeletePost = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostDeleteModal" });
  };

  return (
    <ModalWrapper>
      <ModalItem delete={false} onClick={onClickUpdatePost} className="update-post-btn">
        <img src="icons/update.svg" alt="update icon" />
      </ModalItem>
      <ModalItem delete={true} onClick={onClickDeletePost} className="delete-delete-btn">
        <img src="icons/trash.svg" alt="trash icon" />
      </ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 5rem;
  height: 16rem;
  background-color: ${COLOR.WHITE};
  position: absolute;
  left: 100%;
  border-radius: 0 10px 10px 0;
  z-index: 5;
`;
const ModalItem = styled.div<{ delete: boolean }>`
  ${flexRowCenterAlign}
  height: 50%;

  & > img {
    &:hover {
      cursor: pointer;
      opacity: 0.5;
    }
  }

  &: first-child {
    border-bottom: 0.2rem solid ${COLOR.GRAY};
  }
`;

export default PostSettingModal;
