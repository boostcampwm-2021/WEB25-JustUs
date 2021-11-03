import styled from "styled-components";
import color from "@styles/Color";

interface GroupProps {
  groupName: string;
}

const Group = ({ groupName }: GroupProps) => {
  return <ButtonWrapper>{groupName}</ButtonWrapper>;
};

const ButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${color.white};
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Group;
