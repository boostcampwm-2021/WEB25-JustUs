import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
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
      groupImg={groupImg}
      onClick={onClickGroup}
    ></ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<{ selectedGroupID: number; groupID: number; groupImg: string }>`
  ${flexRowCenterAlign}
  min-width: 3vw;
  min-height: 3vw;
  background-color: ${COLOR.WHITE};
  margin: 10%;
  border-radius: 1vw;
  border: ${props =>
    props.selectedGroupID === props.groupID ? `5px solid ${COLOR.THEME1.SECONDARY}` : `5px solid ${COLOR.WHITE}`};
  background-image: url("${props => props.groupImg}");
  background-size: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
`;

export default Group;
