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
      <div>{selectedGroup.groupName}</div>
      <div onClick={onClickSettingGroup}>
        <img src="/icons/settings.svg" alt="settings icon.svg" />
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

export default SettingGroup;
