import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { ReactComponent as SettingsSVG } from "@styles/icons/settings.svg";
import { getGroupMemberListAction } from "@src/reducer/GroupReducer";

const SettingGroup = () => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const { nowTheme }: any = useSelector((state: RootState) => state.theme);

  const onClickSettingGroup = async () => {
    dispatch(getGroupMemberListAction({ groupId: selectedGroup.groupId }));
  };

  return (
    <SettingGroupWrapper>
      <GroupName>{selectedGroup.groupName}</GroupName>
      <div onClick={onClickSettingGroup}>
        <SettingIconWrapper>
          <SettingsSVG fill={nowTheme.MENUTEXT} />
        </SettingIconWrapper>
      </div>
    </SettingGroupWrapper>
  );
};

const SettingGroupWrapper = styled.div`
  width: 20rem;
  height: 100%;
  background-color: ${(props) => props.theme.PRIMARY};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px ${COLOR.WHITE} solid;
  color: ${(props) => props.theme.MENUTEXT};
  font-weight: bold;
`;

const SettingIconWrapper = styled.div`
  cursor: pointer;
`;

const GroupName = styled.div`
  cursor: default;
  padding-left: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 15rem;
`;

export default SettingGroup;
