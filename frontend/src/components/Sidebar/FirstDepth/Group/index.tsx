import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";

interface GroupProps {
  groupName: string;
}

const Group = ({ groupName }: GroupProps) => {
  return <ButtonWrapper>{groupName}</ButtonWrapper>;
};

const ButtonWrapper = styled.div`
  ${flexCenterAlign}
  min-width: 60px;
  min-height: 60px;
  background-color: ${Color.white};
  margin: 10px;
  border-radius: 20px;
`;

export default Group;
