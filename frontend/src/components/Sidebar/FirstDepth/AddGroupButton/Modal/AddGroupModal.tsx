import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";
import { useDispatch } from "react-redux";
import { GroupModalAction } from "@src/action";

const AddGroupModal = () => {
  const dispatch = useDispatch();

  const onClickCreateGroupBtn = () => {
    dispatch({ type: GroupModalAction.OPEN_CREATE_GROUP_MODAL });
  };

  const onClickJoinGroupBtn = () => {
    dispatch({ type: GroupModalAction.OPEN_JOIN_GROUP_MODAL });
  };

  return (
    <ModalWrapper>
      <ModalItem onClick={onClickCreateGroupBtn}>그룹 생성</ModalItem>
      <Divider />
      <ModalItem onClick={onClickJoinGroupBtn}>그룹 참가</ModalItem>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  width: 150px;
  height: 100px;
  background-color: ${Color.gray};
  position: relative;
  top: -70px;
  left: 110px;
  border-radius: 10px;
`;

const ModalItem = styled.div`
  ${flexCenterAlign}
  height: 50%;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Color.black};
`;

export default AddGroupModal;
