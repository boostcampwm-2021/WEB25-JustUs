import styled from "styled-components";
import Color from "@components/Styles/Color";

type GroupProps = {
  groupName: string;
};

const Group = ({ groupName }: GroupProps) => {
  return <ButtonWrapper>{groupName}</ButtonWrapper>;
};

const ButtonWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-color: ${Color.white};
  margin: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Group;
