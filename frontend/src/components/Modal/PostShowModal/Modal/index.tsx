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
        수정하기
      </ModalItem>
      <Divider />
      <ModalItem delete={true} onClick={onClickDeletePost} className="delete-delete-btn">
        삭제하기
      </ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 150px;
  height: 100px;
  background-color: ${COLOR.WHITE};
  position: absolute;
  left: 100%;
  border-radius: 0 10px 10px 0;
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

export default PostSettingModal;
