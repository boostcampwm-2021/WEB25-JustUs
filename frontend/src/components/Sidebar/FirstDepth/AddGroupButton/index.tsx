import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";

interface AddGroupButtonProps {
  addGroupBtnRef: React.RefObject<HTMLDivElement>;
}

const AddGroupButton = ({ addGroupBtnRef }: AddGroupButtonProps) => {
  return (
    <>
      <ButtonWrapper ref={addGroupBtnRef} className="add-group-btn"></ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  min-width: 3vw;
  min-height: 3vw;
  background: ${COLOR.THEME1.PRIMARY};
  background-image: url("/icons/add-group.svg");
  ${flexRowCenterAlign}
  border: 1px solid ${COLOR.THEME1.SECONDARY};
  margin: 10%;
  padding: 10%;
  border-radius: 1vw;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: 70%;
  background-position: center;
`;

export default AddGroupButton;
