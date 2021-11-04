import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";
import { useDispatch } from "react-redux";
import { GroupModalAction } from "@src/action";

interface AddGroupModal {
  clientX: number;
  clientY: number;
}

const AddGroupModal = ({ clientX, clientY }: AddGroupModal) => {
  const dispatch = useDispatch();
  const onClickCreateGroupBtn = () => {
    dispatch({ type: "OPEN_MODAL", payload: "CreateGroupModal" });
  };

  const onClickJoinGroupBtn = () => {
    dispatch({ type: "OPEN_MODAL", payload: "JoinGroupModal" });
  };

  return (
    <ModalWrapper clientX={clientX} clientY={clientY}>
      <ModalItem onClick={onClickCreateGroupBtn}>그룹 생성</ModalItem>
      <Divider />
      <ModalItem onClick={onClickJoinGroupBtn}>그룹 참가</ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{ clientX: number; clientY: number }>`
  width: 150px;
  height: 100px;
  background-color: ${Color.gray};
  position: absolute;
  left: ${({ clientX }) => `${clientX + 30}px`};
  top: ${({ clientY }) => (clientY + 100 > window.innerHeight ? `${clientY - 100}px` : `${clientY - 10}px`)};
  border-radius: 10px;
  z-index: 5;
`;

const ModalItem = styled.div`
  ${flexCenterAlign}
  height: 50%;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Color.black};
`;

export default AddGroupModal;
