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
  DragHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
  DragEndHandler: (ev: React.DragEvent<HTMLDivElement>) => void;
}

const Group = ({ setIsToggle, groupID, groupName, groupImg, DragHandler, DragEndHandler }: GroupProps) => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const onClickGroup = () => {
    const albumList = [
      {
        albumID: 0,
        albumName: "기본 앨범",
        posts: [
          { postID: 4, postTitle: "스타벅스 리저브" },
          { postID: 5, postTitle: "롯데백화점" },
        ],
      },
      {
        albumID: 1,
        albumName: "일상 데이트",
        posts: [
          { postID: 0, postTitle: "돼지세끼" },
          { postID: 1, postTitle: "미삼집" },
          { postID: 2, postTitle: "남산서울타워" },
        ],
      },
      {
        albumID: 2,
        albumName: "2020 일본 여행",
        posts: [{ postID: 3, postTitle: "후쿠오카" }],
      },
    ];
    dispatch({ type: GroupAction.SET_SELECTED_GROUP, payload: { groupID, groupName, groupImg, albumList } });
    setIsToggle(true);
  };

  return (
    <ButtonWrapper
      draggable={true}
      selectedGroupID={selectedGroup ? selectedGroup.groupID : -1}
      groupID={groupID}
      groupImg={groupImg}
      onDrag={DragHandler}
      onDragEnd={DragEndHandler}
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
  border: ${(props) =>
    props.selectedGroupID === props.groupID ? `5px solid ${props.theme.SECONDARY};` : `5px solid ${COLOR.WHITE}`};
  background-image: url("${(props) => props.groupImg}");
  background-size: 100%;
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Group;
