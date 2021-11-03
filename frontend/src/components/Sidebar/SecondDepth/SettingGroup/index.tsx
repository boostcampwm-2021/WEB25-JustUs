import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Color from "@styles/Color";
import { useDispatch } from "react-redux";
import { GroupModalAction } from "@src/action";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const SettingGroup = () => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const onClickSettingGroup = () => {
    dispatch({ type: GroupModalAction.OPEN_SETTING_GROUP_MODAL });
  };

  return (
    <SettingGroupWrapper>
      <GroupName>{selectedGroup.groupName}</GroupName>
      <div onClick={onClickSettingGroup}>
        <SettingIconWrapper>
          <img src="/icons/settings.svg" alt="settings icon.svg" />
        </SettingIconWrapper>
      </div>
    </SettingGroupWrapper>
  );
};

const SettingGroupWrapper = styled.div`
  width: 15vw;
  height: 6vh;
  background-color: ${Color["theme1-primary"]};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px ${Color.white} solid;
  color: ${Color.white};
`;

const SettingIconWrapper = styled.div`
  cursor: pointer;
`;

const GroupName = styled.div`
  cursor: default;
`;

export default SettingGroup;
