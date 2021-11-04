import styled from "styled-components";
import COLOR from "@styles/Color";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@src/reducer";

const SettingGroup = () => {
  const dispatch = useDispatch();
  const { selectedGroup }: any = useSelector((state: RootState) => state.groups);

  const onClickSettingGroup = () => {
    dispatch({ type: "OPEN_MODAL", payload: "SettingGroupModal" });
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
  width: 100%;
  height: 6vh;
  background-color: ${COLOR.THEME1.PRIMARY};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px ${COLOR.WHITE} solid;
  color: ${COLOR.WHITE};
`;

const SettingIconWrapper = styled.div`
  cursor: pointer;
`;

const GroupName = styled.div`
  cursor: default;
`;

export default SettingGroup;
