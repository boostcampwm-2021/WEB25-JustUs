import styled from "styled-components";
import Color from "@styles/Color";

const AddGroupButton = () => {
  return (
    <>
      <ButtonWrapper>
        <img src="/icons/add-group.svg" alt="add-group icon.svg" />
      </ButtonWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: ${Color["theme1-primary"]};
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #91c788;
`;

export default AddGroupButton;
