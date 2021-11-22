import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import COLOR from "@styles/Color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { getAlbumListAction } from "@src/reducer/GroupReducer";

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
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const onClickGroup = () => {
    if (selectedGroup?.groupId === groupId && isToggle) {
      setIsToggle(false);
    } else {
      dispatch(getAlbumListAction({ groupId, groupName, groupImage }));
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
  min-width: 3vw;
  min-height: 3vw;
  background-color: ${COLOR.WHITE};
  margin: 10%;
  border-radius: 1vw;
  border: ${(props) =>
    props.selectedGroupID === props.groupId ? `5px solid ${props.theme.SECONDARY};` : `5px solid ${COLOR.WHITE}`};
  background-image: url("${(props) => props.groupImage}");
  background-size: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Group;
