import styled from "styled-components";
import Color from "@styles/Color";

const AddGroupModal = () => {
  return (
    <ModalWrapper>
      <ModalItem>그룹 생성</ModalItem>
      <Divider />
      <ModalItem>그룹 참가</ModalItem>
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
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Color.black};
`;
export default AddGroupModal;
