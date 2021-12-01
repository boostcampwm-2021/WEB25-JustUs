import React from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";
import { ReactComponent as SettingsSVG } from "@styles/icons/settings.svg";
import { ReactComponent as InfoSVG } from "@styles/icons/info.svg";
import { GroupAction, ModalAction } from "@src/action";
import { flexRowCenterAlign } from "@src/styles/StyledComponents";
import { modal } from "@src/constants";

const SettingGroup = () => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);
  const { nowTheme }: any = useSelector((state: RootState) => state.theme);

  const onClickShowGroupInfo = () => {
    dispatch(GroupAction.getGroupMemberListAction({ groupId: selectedGroup.groupId }));
  };
  const onClickSettingGroup = async () => {
    dispatch(ModalAction.openModalAction(modal.GroupSettingModal));
  };

  return (
    <SettingGroupWrapper>
      <GroupName>
        <span>{selectedGroup.groupName}</span>
      </GroupName>

      <InfoIconWrapper onClick={onClickShowGroupInfo}>
        <InfoSVG fill={nowTheme.MENUTEXT} />
      </InfoIconWrapper>

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
  padding-left: 1rem;
  overflow: hidden;
  ${flexRowCenterAlign}
  & span {
    overflow: hidden;
    white-space: nowrap;
  }
`;
const InfoIconWrapper = styled.div`
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

export default React.memo(SettingGroup);
