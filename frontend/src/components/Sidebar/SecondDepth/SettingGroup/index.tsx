import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { ReactComponent as SettingsSVG } from "@styles/icons/settings.svg";
import { ReactComponent as VisibilitySVG } from "@styles/icons/visibility.svg";
import { getGroupMemberListAction } from "@src/reducer/GroupReducer";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";

const SettingGroup = () => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const { nowTheme }: any = useSelector((state: RootState) => state.theme);

  const onClickShowGroupInfo = () => {
    dispatch(getGroupMemberListAction({ groupId: selectedGroup.groupId }));
  };
  const onClickSettingGroup = async () => {
    dispatch({ type: "OPEN_MODAL", payload: "GroupSettingModal" });
  };

  return (
    <SettingGroupWrapper>
      <GroupName>{selectedGroup.groupName}</GroupName>

      <VisibilityIconWrapper onClick={onClickShowGroupInfo}>
        <VisibilitySVG fill={nowTheme.MENUTEXT} />
      </VisibilityIconWrapper>

      <SettingIconWrapper onClick={onClickSettingGroup}>
        <SettingsSVG fill={nowTheme.MENUTEXT} />
      </SettingIconWrapper>
    </SettingGroupWrapper>
  );
};

const SettingGroupWrapper = styled.div`
  height: 100%;
  background-color: ${(props) => props.theme.PRIMARY};
  display: grid;
  grid-template-columns: 60% 20% 20%;
  border-bottom: 1px ${COLOR.WHITE} solid;
  color: ${(props) => props.theme.MENUTEXT};
  font-weight: bold;
`;
const GroupName = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  cursor: default;
  padding-left: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;
const VisibilityIconWrapper = styled.div`
  cursor: pointer;
  grid-column-start: 2;
  grid-column-end: 3;
  height: 100%;
  ${flexRowCenterAlign};
`;
const SettingIconWrapper = styled.div`
  cursor: pointer;
  grid-column-start: 3;
  grid-column-end: 4;
  ${flexRowCenterAlign};
`;

export default SettingGroup;
