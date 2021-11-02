import styled from "styled-components";
import Color from "@components/Styles/Color";

const SettingGroup = () => {
  return (
    <SettingGroupWrapper>
      <div>그룹 A</div>
      <div>
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
