import styled from "styled-components";
import color from "@styles/Color";
import { useDispatch } from "react-redux";

const SettingGroup = () => {
  const dispatch = useDispatch();

  const onClickSettingGroup = () => {
    console.log("Setting group icon clicked.");
    dispatch({ type: "OPEN_SETTING_GROUP_MODAL" });
  };

  return (
    <SettingGroupWrapper>
      <div>그룹 A</div>
      <div onClick={onClickSettingGroup}>
        <img src="/icons/settings.svg" alt="settings icon.svg" />
      </div>
    </SettingGroupWrapper>
  );
};

const SettingGroupWrapper = styled.div`
  width: 15vw;
  height: 6vh;
  background-color: ${color.theme1.primary};
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px ${color.white} solid;
  color: ${color.white};
`;

export default SettingGroup;
