import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { GroupAction } from "@src/action";

interface GroupProps {
  isToggle: boolean;
  setIsToggle: Dispatch<SetStateAction<boolean>>;
  groupId: number;
  groupName: string;
  groupImage: string;
  DragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  DragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
}

const Group = ({ isToggle, setIsToggle, groupId, groupName, groupImage, DragHandler, DragEndHandler }: GroupProps) => {
  const dispatch = useDispatch();
  const { selectedGroup, groups }: any = useSelector((state: RootState) => state.groups);

  const onClickGroup = () => {
    if (selectedGroup?.groupId === groupId && isToggle) {
      setIsToggle(false);
    } else {
      const selectedGroupIdx = groups.findIndex((group: GroupProps) => group.groupId === groupId);
      dispatch(GroupAction.getAlbumListAction({ groupId, groupName, groupImage }));
      dispatch({ type: "SET_SELECTED_GROUP_IDX", payload: { selectedGroupIdx } });
      setIsToggle(true);
    }
  };

  return (
    <ButtonWrapper
      draggable={true}
      selectedGroupID={selectedGroup ? selectedGroup.groupId : -1}
      groupId={groupId}
      groupImage={groupImage}
      onDrag={DragHandler}
      onDragEnd={DragEndHandler}
      onClick={onClickGroup}
      onDragOver={(e) => e.preventDefault()}
      data-id={groupId}
    ></ButtonWrapper>
  );
};

const ButtonWrapper = styled.div<{ selectedGroupID: number; groupId: number; groupImage: string }>`
  ${flexRowCenterAlign}
  min-width: 3rem;
  min-height: 3rem;
  width: 6rem;
  height: 6rem;
  background-color: ${COLOR.WHITE};
  margin: 1rem auto;
  border-radius: 1rem;
  border: ${(props) => (props.selectedGroupID === props.groupId ? `5px solid ${props.theme.SECONDARY};` : ``)};
  background-image: url("${(props) => (props.groupImage ? props.groupImage : "/icons/podo-many.png")}");
  background-size: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Group;
