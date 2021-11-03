import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexCenterAlign } from "@styles/StyledComponents";
import Color from "@styles/Color";
import { GroupAction } from "@src/action/index";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";

interface GroupProps {
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  groupID: number;
  groupName: string;
  groupImg: string;
  albumList: Array<{ albumID: number; albumName: string; posts: Array<{ postID: number; postTitle: string }> }>;
}

const Group = ({ setIsToggle, groupID, groupName, groupImg, albumList }: GroupProps) => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const onClickGroup = () => {
    dispatch({ type: GroupAction.SET_SELECTED_GROUP, payload: { groupID, groupName, groupImg, albumList } });
    setIsToggle(true);
  };

  return (
    <ButtonWrapper
      selectedGroupID={selectedGroup ? selectedGroup.groupID : -1}
      groupID={groupID}
      onClick={onClickGroup}
    >
      {groupName}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<{ selectedGroupID: number; groupID: number }>`
  ${flexCenterAlign}
  min-width: 60px;
  min-height: 60px;
  background-color: ${Color.white};
  margin: 10px;
  border-radius: 20px;
  border: ${props =>
    props.selectedGroupID === props.groupID ? `5px solid ${Color["theme1-secondary"]}` : `5px solid ${Color.white}`};
`;

export default Group;
