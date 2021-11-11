import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";

interface AddGroupButtonProps {
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const AddGroupButton = ({ addGroupBtnRef }: AddGroupButtonProps) => {
  return (
    <>
      <ButtonWrapper ref={addGroupBtnRef} className="add-group-btn">
        <img src="/icons/add-group.svg" alt="add-group icon.svg" />
      </ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  ${flexCenterAlign}
  min-width: 60px;
  min-height: 60px;
  background: ${Color["theme1-primary"]};
  margin: 20px;
  border-radius: 20px;
  border: 1px solid ${Color["theme1-secondary"]};
  cursor: pointer;
`;

export default AddGroupButton;
